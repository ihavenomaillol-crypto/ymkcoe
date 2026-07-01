export type Department = {
  id: string;
  label: string;
  short: string;
  color: string;
  dotColor: string;
  intake: number;
  tagline: string;
  gradient: string;
  hoverBg: string;
};

export const DTE_CODE = "16352";

export type BtechProgram = {
  deptId: string;
  program: string;
  courseName: string;
  intake: number;
  choiceCode: string;
  choiceCodeTfws: string;
};

export const BTECH_PROGRAMS: BtechProgram[] = [
  {
    deptId: "cse",
    program: "B. Tech",
    courseName: "Computer Science & Engineering",
    intake: 120,
    choiceCode: "1635224210",
    choiceCodeTfws: "1635224211T",
  },
  {
    deptId: "aids",
    program: "B. Tech",
    courseName: "Artificial Intelligence and Data Science",
    intake: 120,
    choiceCode: "1635299510",
    choiceCodeTfws: "1635299511T",
  },
  {
    deptId: "entc",
    program: "B. Tech",
    courseName: "Electronics & Telecommunication Engineering",
    intake: 60,
    choiceCode: "1635237210",
    choiceCodeTfws: "1635237211T",
  },
  {
    deptId: "it",
    program: "B. Tech",
    courseName: "Information Technology",
    intake: 60,
    choiceCode: "1635224610",
    choiceCodeTfws: "1635224611T",
  },
];

export const DEPARTMENTS: Department[] = [
  {
    id: "cse",
    label: "Computer Science Engineering",
    short: "CSE",
    color: "text-blue-600 dark:text-blue-400",
    dotColor: "bg-blue-500",
    intake: 120,
    tagline: "Algorithms, software systems & emerging tech",
    gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
    hoverBg: "hover:border-blue-300 hover:bg-blue-50/80",
  },
  {
    id: "aids",
    label: "Artificial Intelligence & Data Science",
    short: "AI&DS",
    color: "text-violet-600 dark:text-violet-400",
    dotColor: "bg-violet-500",
    intake: 120,
    tagline: "ML, deep learning & data-driven innovation",
    gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
    hoverBg: "hover:border-violet-300 hover:bg-violet-50/80",
  },
  {
    id: "entc",
    label: "Electronics & Telecommunication",
    short: "ENTC",
    color: "text-emerald-600 dark:text-emerald-400",
    dotColor: "bg-emerald-500",
    intake: 60,
    tagline: "Embedded systems, IoT & wireless communication",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    hoverBg: "hover:border-emerald-300 hover:bg-emerald-50/80",
  },
  {
    id: "it",
    label: "Information Technology",
    short: "IT",
    color: "text-orange-600 dark:text-orange-400",
    dotColor: "bg-orange-500",
    intake: 60,
    tagline: "Full-stack development, cloud & enterprise IT",
    gradient: "from-orange-500/20 via-orange-500/5 to-transparent",
    hoverBg: "hover:border-orange-300 hover:bg-orange-50/80",
  },
];

export function getDepartmentsHref() {
  return "/departments";
}

export function getDepartmentHref(id: string) {
  return `/department/${id}`;
}
