import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const facultyTable = pgTable("faculty", {
  id: serial("id").primaryKey(),
  title: text("title"),
  name: text("name").notNull(),
  department: text("department").notNull(),
  designation: text("designation").notNull(),
  qualification: text("qualification"),
  specialization: text("specialization"),
  experience: text("experience"),
  researchGuideStatus: text("research_guide_status"),
  email: text("email"),
  phone: text("phone"),
  photoUrl: text("photo_url"),
  adminRoles: text("admin_roles"),
  coreSkills: text("core_skills"),
  publications: text("publications"),
  professionalMemberships: text("professional_memberships"),
  bio: text("bio"),
  isHOD: boolean("is_hod").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertFacultySchema = createInsertSchema(facultyTable).omit({ id: true, createdAt: true });
export type InsertFaculty = z.infer<typeof insertFacultySchema>;
export type FacultyMember = typeof facultyTable.$inferSelect;
