import { Users, FileText, Scale, ShieldAlert, Landmark, FileCheck, HelpCircle, Activity, Banknote, ShieldCheck, HeartHandshake, Eye, HandHeart } from "lucide-react";
import React from "react";

export interface GovernanceMember {
  name: string;
  designation: string;
  role: string;
  organization?: string;
}

export interface GovernanceDocument {
  title: string;
  date: string;
  url: string;
}

export interface GovernanceConfig {
  slug: string;
  title: string;
  icon: React.ElementType;
  description: string;
  objectives: string[];
  members: GovernanceMember[];
  documents: GovernanceDocument[];
  type?: "cell" | "committee" | "document-only" | "form";
}

// Reusable standard members for placeholder purposes
const STD_MEMBERS: GovernanceMember[] = [
  { name: "Dr. S. S. Devaskar", designation: "Principal", role: "Chairman", organization: "YMKCOE" },
  { name: "Dr. A. R. Kulkarni", designation: "HOD", role: "Member Secretary" },
  { name: "Prof. S. M. Patel", designation: "Assistant Professor", role: "Member" },
  { name: "Smt. M. N. Deshmukh", designation: "Office Superintendent", role: "Member" },
  { name: "Mr. R. V. Kadam", designation: "Student Representative", role: "Member" },
];

const STD_DOCS: GovernanceDocument[] = [
  { title: "Constitution & Guidelines 2024-25", date: "August 2024", url: "/404" },
  { title: "Minutes of Meeting - Semester I", date: "September 2024", url: "/404" },
  { title: "Minutes of Meeting - Semester II", date: "February 2025", url: "/404" },
];

export const GOVERNANCE_DATA: Record<string, GovernanceConfig> = {
  "student-grievance-redressal-cell": {
    slug: "student-grievance-redressal-cell",
    title: "Student Grievance Redressal Cell",
    icon: Scale,
    type: "cell",
    description: "A dedicated cell to address and resolve academic and non-academic grievances of students effectively and impartially.",
    objectives: [
      "To ensure transparency in all activities at different stages.",
      "To encourage students to express their grievances freely and frankly without fear of victimization.",
      "To advise students to respect the right and dignity of one another.",
    ],
    members: STD_MEMBERS,
    documents: STD_DOCS,
  },
  "anti-ragging-cell": {
    slug: "anti-ragging-cell",
    title: "Anti Ragging Cell",
    icon: ShieldAlert,
    type: "cell",
    description: "Ensuring a ragging-free campus and maintaining a secure, friendly environment for all students, strictly adhering to AICTE and UGC guidelines.",
    objectives: [
      "To prohibit any conduct by any student or students whether by words spoken or written or by an act which has the effect of teasing or handling with rudeness a fresher or any other student.",
      "To actively monitor the campus to ensure zero incidents of ragging.",
      "To organize anti-ragging awareness campaigns.",
    ],
    members: [
      { name: "Dr. S. S. Devaskar", designation: "Principal", role: "Chairman" },
      { name: "Police Inspector, Talegaon", designation: "Civil/Police Administration", role: "Member" },
      { name: "Local Media Representative", designation: "Local Media", role: "Member" },
      ...STD_MEMBERS.slice(1)
    ],
    documents: [
      { title: "Anti-Ragging Committee Formation", date: "July 2024", url: "/404" },
      { title: "UGC Anti-Ragging Guidelines", date: "2016", url: "/404" },
    ],
  },
  "mandatory-disclosure-1": {
    slug: "mandatory-disclosure-1",
    title: "Mandatory Disclosure",
    icon: FileText,
    type: "document-only",
    description: "Official institutional data and mandatory disclosures as per AICTE guidelines for transparency and public awareness.",
    objectives: [],
    members: [],
    documents: [
      { title: "AICTE Mandatory Disclosure 2024-25", date: "April 2024", url: "/404" },
      { title: "AICTE Mandatory Disclosure 2023-24", date: "April 2023", url: "/404" },
    ],
  },
  "college-development-committee": {
    slug: "college-development-committee",
    title: "College Development Committee (CDC)",
    icon: Landmark,
    type: "committee",
    description: "Responsible for creating a comprehensive development plan of the college regarding academic, administrative and infrastructural growth.",
    objectives: [
      "To prepare an overall comprehensive development plan.",
      "To recommend about the management of the academic and administrative activities.",
      "To make recommendations regarding the students and employees welfare activities.",
    ],
    members: STD_MEMBERS,
    documents: STD_DOCS,
  },
  "finance-committee": {
    slug: "finance-committee",
    title: "Finance Committee",
    icon: Banknote,
    type: "committee",
    description: "Oversees the financial planning, budget allocations, and auditing to ensure smooth financial operations of the institution.",
    objectives: [
      "To examine and scrutinize the annual budget of the institute.",
      "To consider and recommend financial estimates.",
      "To monitor the utilization of funds and grants.",
    ],
    members: STD_MEMBERS,
    documents: STD_DOCS,
  },
  "internal-quality-assurance-cell": {
    slug: "internal-quality-assurance-cell",
    title: "Internal Quality Assurance Cell (IQAC)",
    icon: FileCheck,
    type: "cell",
    description: "A mechanism to build and ensure a quality culture at the institutional level, improving academic and administrative performance.",
    objectives: [
      "To develop a system for conscious, consistent and catalytic action to improve the academic and administrative performance of the institution.",
      "To promote measures for institutional functioning towards quality enhancement.",
    ],
    members: STD_MEMBERS,
    documents: STD_DOCS,
  },
  "grievance-redressal-cell": {
    slug: "grievance-redressal-cell",
    title: "Grievance Redressal Cell",
    icon: HelpCircle,
    type: "cell",
    description: "An avenue for students and staff to voice their concerns and seek equitable solutions.",
    objectives: [
      "To uphold the dignity of the College by ensuring strife free atmosphere.",
      "To provide responsive, accountable and easily accessible machinery for settlement of grievances.",
    ],
    members: STD_MEMBERS,
    documents: STD_DOCS,
  },
  "college-student-council": {
    slug: "college-student-council",
    title: "College Student Council",
    icon: Users,
    type: "committee",
    description: "Representing the student body, fostering leadership, and coordinating extra-curricular and co-curricular activities.",
    objectives: [
      "To improve student life on campus.",
      "To serve as a bridge between the student body and the administration.",
      "To organize cultural, sports, and technical events.",
    ],
    members: [
      { name: "Dr. S. S. Devaskar", designation: "Principal", role: "Chairman" },
      { name: "Prof. Student Welfare", designation: "Faculty", role: "Coordinator" },
      { name: "General Secretary", designation: "Student", role: "Member" },
      { name: "Cultural Secretary", designation: "Student", role: "Member" },
      { name: "Sports Secretary", designation: "Student", role: "Member" },
    ],
    documents: [
      { title: "Student Council Formation 2024-25", date: "August 2024", url: "/404" }
    ],
  },
  "student-development-cell": {
    slug: "student-development-cell",
    title: "Student Development Cell",
    icon: Activity,
    type: "cell",
    description: "Focused on holistic development through skill-building workshops, leadership programs, and career guidance.",
    objectives: [
      "To nurture students' soft skills and technical abilities.",
      "To facilitate personality development programs.",
    ],
    members: STD_MEMBERS,
    documents: STD_DOCS,
  },
  "student-grievance-form": {
    slug: "student-grievance-form",
    title: "Student Grievance Form",
    icon: FileText,
    type: "form",
    description: "Submit your academic or non-academic grievances online. All submissions are handled confidentially by the Grievance Redressal Cell.",
    objectives: [],
    members: [],
    documents: [],
  },
  "mandatory-disclosure-2": {
    slug: "mandatory-disclosure-2",
    title: "Mandatory Disclosure (2)",
    icon: FileText,
    type: "document-only",
    description: "Additional institutional disclosures and compliance reports as mandated by governing bodies.",
    objectives: [],
    members: [],
    documents: [
      { title: "Audit Report 2023-24", date: "April 2024", url: "/404" }
    ],
  },
  "balance-sheet": {
    slug: "balance-sheet",
    title: "Balance Sheet",
    icon: Banknote,
    type: "document-only",
    description: "Audited financial statements and balance sheets of the institution ensuring complete financial transparency.",
    objectives: [],
    members: [],
    documents: [
      { title: "Audited Balance Sheet 2023-24", date: "September 2024", url: "/404" },
      { title: "Audited Balance Sheet 2022-23", date: "September 2023", url: "/404" },
    ],
  },
  "grievance-redressal-committee": {
    slug: "grievance-redressal-committee",
    title: "Grievance Redressal Committee",
    icon: Scale,
    type: "committee",
    description: "The formal committee responsible for reviewing and arbitrating complex grievances raised by staff or students.",
    objectives: [
      "To ensure fair hearing of grievances.",
      "To take prompt corrective actions based on the findings."
    ],
    members: STD_MEMBERS,
    documents: STD_DOCS,
  },
  "women-grievance-redressal-committee": {
    slug: "women-grievance-redressal-committee",
    title: "Women Grievance Redressal Committee",
    icon: ShieldCheck,
    type: "committee",
    description: "Dedicated to addressing grievances related to female students and staff, ensuring a safe and respectful campus environment.",
    objectives: [
      "To prevent discrimination and sexual harassment against women.",
      "To provide a confidential mechanism for filing complaints.",
    ],
    members: [
      { name: "Dr. Mrs. A. B. Joshi", designation: "Professor", role: "Presiding Officer" },
      { name: "Mrs. N. R. Kulkarni", designation: "NGO Representative", role: "Member" },
      ...STD_MEMBERS.slice(2)
    ],
    documents: STD_DOCS,
  },
  "icc-women-grievance-cell": {
    slug: "icc-women-grievance-cell",
    title: "Internal Complaint Committee (Women Grievance Cell) 2025-2026",
    icon: ShieldCheck,
    type: "cell",
    description: "The Internal Complaint Committee formed under the POSH Act to specifically address and resolve cases of sexual harassment at workplace/campus.",
    objectives: [
      "To fulfill the directives of the Supreme Court of India.",
      "To create awareness about sexual harassment and the laws protecting women.",
    ],
    members: STD_MEMBERS,
    documents: [
      { title: "ICC Constitution 2025-26", date: "January 2025", url: "/404" }
    ],
  },
  "anti-ragging-squad": {
    slug: "anti-ragging-squad",
    title: "Anti Ragging Squad",
    icon: ShieldAlert,
    type: "committee",
    description: "The operational arm of the Anti-Ragging Cell, responsible for patrolling the campus and hostels to prevent any incidents.",
    objectives: [
      "To make surprise raids on hostels and other hot spots.",
      "To inspect places of potential ragging and take immediate action."
    ],
    members: STD_MEMBERS,
    documents: STD_DOCS,
  },
  "sc-st-cell": {
    slug: "sc-st-cell",
    title: "SC ST Cell",
    icon: Users,
    type: "cell",
    description: "Promoting the special interests of students in the reserved category and providing guidance to them.",
    objectives: [
      "To ensure proper implementation of government reservation policies.",
      "To provide special coaching/guidance for competitive exams.",
    ],
    members: STD_MEMBERS,
    documents: STD_DOCS,
  },
  "caste-based-discrimination-cell": {
    slug: "caste-based-discrimination-cell",
    title: "Caste Based Discrimination Cell",
    icon: Scale,
    type: "cell",
    description: "Ensuring that no official or faculty member indulges in any kind of discrimination against any community or category of students.",
    objectives: [
      "To resolve grievances regarding caste-based discrimination.",
      "To maintain a register of complaints and actions taken."
    ],
    members: STD_MEMBERS,
    documents: STD_DOCS,
  },
  "internal-complaint-committee": {
    slug: "internal-complaint-committee",
    title: "Internal Complaint Committee (ICC)",
    icon: HandHeart,
    type: "committee",
    description: "A statutory body resolving internal complaints, ensuring a harmonious and safe working environment.",
    objectives: [
      "To handle general administrative complaints.",
      "To ensure fair processes are followed in dispute resolutions."
    ],
    members: STD_MEMBERS,
    documents: STD_DOCS,
  },
  "sc-st-cell-advisory": {
    slug: "sc-st-cell-advisory",
    title: "SC-ST Cell Advisory Committee",
    icon: HeartHandshake,
    type: "committee",
    description: "Advising the SC-ST Cell on policy implementation and welfare schemes for reserved category students.",
    objectives: [
      "To review the functioning of the SC-ST cell.",
      "To recommend new welfare programs."
    ],
    members: STD_MEMBERS,
    documents: STD_DOCS,
  },
  "equal-opportunity-cell": {
    slug: "equal-opportunity-cell",
    title: "Equal Opportunity Cell",
    icon: Eye,
    type: "cell",
    description: "Dedicated to ensuring that disadvantaged groups have equal access to educational opportunities and resources.",
    objectives: [
      "To oversee the effective implementation of policies and programmes for disadvantaged groups.",
      "To provide guidance and counselling with respect to academic, financial, social and other matters."
    ],
    members: STD_MEMBERS,
    documents: STD_DOCS,
  },
  "divyang-cell": {
    slug: "divyang-cell",
    title: "Divyang Cell",
    icon: Activity,
    type: "cell",
    description: "Providing necessary support, infrastructure, and an inclusive environment for differently-abled students and staff.",
    objectives: [
      "To provide accessible infrastructure (ramps, lifts, washrooms).",
      "To assist in procuring government scholarships and aids.",
    ],
    members: STD_MEMBERS,
    documents: STD_DOCS,
  },
  "fra": {
    slug: "fra",
    title: "Fee Regulating Authority (FRA)",
    icon: Banknote,
    type: "document-only",
    description: "Documents and approvals relating to the Fee Regulating Authority of Maharashtra State.",
    objectives: [],
    members: [],
    documents: [
      { title: "FRA Final Fee Structure 2024-25", date: "October 2024", url: "/404" },
      { title: "FRA Approval Letter", date: "September 2024", url: "/404" },
    ],
  },
};
