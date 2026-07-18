import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl, setAuthTokenGetter } from "@workspace/api-client-react";

import { HelmetProvider } from "react-helmet-async";

if (import.meta.env.VITE_API_URL) {
  setBaseUrl(import.meta.env.VITE_API_URL);
}

// Supply bearer token dynamically from localStorage to bypass third-party cookie blocking
setAuthTokenGetter(() => {
  return localStorage.getItem("admin_token");
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
