import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import session from "express-session";
import cookieParser from "cookie-parser";
import router from "./routes";
import { logger } from "./lib/logger";

import helmet from "helmet";

const app: Express = express();
app.set("trust proxy", 1);
app.use(helmet());

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Extract Bearer token from Authorization header and inject into signedCookies for express-session compatibility
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const sessionId = authHeader.substring(7);
    req.signedCookies = req.signedCookies || {};
    req.signedCookies["connect.sid"] = sessionId;
  }
  next();
});

import path from "path";
import { fileURLToPath } from "url";

app.use(
  session({
    secret: process.env.SESSION_SECRET || "ymkcoe-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Serve uploads directory statically through /api/uploads to leverage existing Vite proxy
app.use("/api/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api", router);

export default app;
