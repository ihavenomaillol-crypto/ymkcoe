import { Router } from "express";
import { db, facultyTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  GetFacultyQueryParams,
  CreateFacultyMemberBody,
  GetFacultyMemberParams,
  UpdateFacultyMemberParams,
  UpdateFacultyMemberBody,
  DeleteFacultyMemberParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/faculty", async (req, res) => {
  const query = GetFacultyQueryParams.safeParse(req.query);
  const { department, limit, offset } = query.success ? query.data : { department: undefined, limit: 12, offset: 0 };
  let members = db.select().from(facultyTable);
  if (department) {
    members = members.where(eq(facultyTable.department, department));
  }
  const results = await members.orderBy(facultyTable.department, facultyTable.id).limit(limit).offset(offset);
  res.json(results.map((f) => ({ ...f, createdAt: f.createdAt.toISOString() })));
});

router.post("/faculty", async (req, res) => {
  const body = CreateFacultyMemberBody.safeParse(req.body);
  if (!body.success) { res.status(400).json({ error: "Invalid input" }); return; }
  const [member] = await db.insert(facultyTable).values(body.data).returning();
  res.status(201).json({ ...member, createdAt: member.createdAt.toISOString() });
});

router.get("/faculty/:id", async (req, res) => {
  const params = GetFacultyMemberParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [member] = await db.select().from(facultyTable).where(eq(facultyTable.id, params.data.id));
  if (!member) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...member, createdAt: member.createdAt.toISOString() });
});

router.patch("/faculty/:id", async (req, res) => {
  const params = UpdateFacultyMemberParams.safeParse({ id: Number(req.params.id) });
  const body = UpdateFacultyMemberBody.safeParse(req.body);
  if (!params.success || !body.success) { res.status(400).json({ error: "Invalid input" }); return; }
  
  // 1. Find the existing member to get their name (before any potential name change)
  const [existingMember] = await db.select().from(facultyTable).where(eq(facultyTable.id, params.data.id));
  if (!existingMember) { res.status(404).json({ error: "Not found" }); return; }

  // 2. Update the specific row requested
  const [updatedMember] = await db.update(facultyTable).set(body.data).where(eq(facultyTable.id, params.data.id)).returning();
  
  // 3. Sync common profile fields across all other rows with the same original name.
  // We don't sync 'department' or 'isHOD' since a person might be HOD in one department but not another.
  const { department, isHOD, ...syncData } = body.data as any;
  if (Object.keys(syncData).length > 0) {
    await db.update(facultyTable).set(syncData).where(eq(facultyTable.name, existingMember.name));
  }

  res.json({ ...updatedMember, createdAt: updatedMember.createdAt.toISOString() });
});

router.delete("/faculty/:id", async (req, res) => {
  const params = DeleteFacultyMemberParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(facultyTable).where(eq(facultyTable.id, params.data.id));
  res.status(204).end();
});

export default router;
