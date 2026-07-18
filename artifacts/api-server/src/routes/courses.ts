import { Router } from "express";
import { db, coursesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  GetCoursesQueryParams,
  CreateCourseBody,
  GetCourseParams,
  UpdateCourseParams,
  UpdateCourseBody,
  DeleteCourseParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/courses", async (req, res) => {
  const query = GetCoursesQueryParams.safeParse(req.query);
  const { department, type, limit, offset } = query.success ? query.data : { department: undefined, type: undefined, limit: 12, offset: 0 };
  let courses = db.select().from(coursesTable).orderBy(coursesTable.department).$dynamic();
  if (department) {
    courses = courses.where(eq(coursesTable.department, department));
  }
  if (type) {
    courses = courses.where(eq(coursesTable.type, type));
  }
  const results = await courses.limit(limit).offset(offset);
  res.json(results.map((c) => ({ ...c, createdAt: c.createdAt.toISOString() })));
});

router.post("/courses", async (req, res) => {
  const body = CreateCourseBody.safeParse(req.body);
  if (!body.success) { res.status(400).json({ error: "Invalid input" }); return; }
  const [course] = await db.insert(coursesTable).values(body.data).returning();
  res.status(201).json({ ...course, createdAt: course.createdAt.toISOString() });
});

router.get("/courses/:id", async (req, res) => {
  const params = GetCourseParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, params.data.id));
  if (!course) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...course, createdAt: course.createdAt.toISOString() });
});

router.patch("/courses/:id", async (req, res) => {
  const params = UpdateCourseParams.safeParse({ id: Number(req.params.id) });
  const body = UpdateCourseBody.safeParse(req.body);
  if (!params.success || !body.success) { res.status(400).json({ error: "Invalid input" }); return; }
  const [course] = await db.update(coursesTable).set(body.data).where(eq(coursesTable.id, params.data.id)).returning();
  if (!course) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...course, createdAt: course.createdAt.toISOString() });
});

router.delete("/courses/:id", async (req, res) => {
  const params = DeleteCourseParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(coursesTable).where(eq(coursesTable.id, params.data.id));
  res.status(204).end();
});

export default router;
