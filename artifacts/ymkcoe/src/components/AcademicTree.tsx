import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Clock, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Award, Layers } from "lucide-react";

export interface Subject {
  code: string;
  name: string;
  credits: number;
  type: "Core" | "Elective" | "Lab" | "Project" | "Audit";
}

export interface SemesterData {
  title: string;
  description: string;
  subjects: Subject[];
}

// Full 8-semester curriculum for all four departments
export const SYLLABUS_DATA: Record<string, Record<number, SemesterData>> = {
  cse: {
    1: {
      title: "Semester I",
      description: "Foundational mathematics, physics, and basic engineering topics to build essential logical and analytical skills.",
      subjects: [
        { code: "BTBS101", name: "Engineering Mathematics I", credits: 4, type: "Core" },
        { code: "BTBS102", name: "Engineering Physics", credits: 4, type: "Core" },
        { code: "BTEST103", name: "Basic Electrical & Electronics Engineering", credits: 3, type: "Core" },
        { code: "BTEST104", name: "Engineering Mechanics", credits: 3, type: "Core" },
        { code: "BTHM105", name: "Communication Skills", credits: 2, type: "Audit" },
        { code: "BTES106L", name: "Computer Programming in C Lab", credits: 2, type: "Lab" }
      ]
    },
    2: {
      title: "Semester II",
      description: "Advanced foundational courses establishing basics in physical sciences, engineering drawing, and mechanical components.",
      subjects: [
        { code: "BTBS201", name: "Engineering Mathematics II", credits: 4, type: "Core" },
        { code: "BTBS202", name: "Engineering Chemistry", credits: 4, type: "Core" },
        { code: "BTEST203", name: "Basic Civil & Mechanical Engineering", credits: 3, type: "Core" },
        { code: "BTEST204", name: "Engineering Graphics", credits: 3, type: "Core" },
        { code: "BTHM205", name: "Energy & Environmental Engineering", credits: 2, type: "Audit" },
        { code: "BTES206L", name: "Programming Lab II (Python)", credits: 2, type: "Lab" }
      ]
    },
    3: {
      title: "Semester III",
      description: "Core computer science foundation covering fundamental mathematical and electronics principles.",
      subjects: [
        { code: "BTCOC301", name: "Discrete Mathematics", credits: 4, type: "Core" },
        { code: "BTCOC302", name: "Data Structures & Algorithms", credits: 4, type: "Core" },
        { code: "BTCOC303", name: "Digital Electronics", credits: 3, type: "Core" },
        { code: "BTCOC304", name: "Object-Oriented Programming (C++/Java)", credits: 3, type: "Core" },
        { code: "BTCOC305", name: "Computer Architecture & Organization", credits: 3, type: "Core" },
        { code: "BTCOL306", name: "Data Structures Lab", credits: 2, type: "Lab" }
      ]
    },
    4: {
      title: "Semester IV",
      description: "Underlying software systems, software development processes, and numerical method modeling.",
      subjects: [
        { code: "BTCOC401", name: "Operating Systems", credits: 4, type: "Core" },
        { code: "BTCOC402", name: "Database Management Systems", credits: 4, type: "Core" },
        { code: "BTCOC403", name: "Theory of Computation", credits: 3, type: "Core" },
        { code: "BTCOC404", name: "Microprocessors & Interfacing", credits: 3, type: "Core" },
        { code: "BTCOE405", name: "Software Engineering", credits: 3, type: "Core" },
        { code: "BTCOL406", name: "Database Systems Lab", credits: 2, type: "Lab" }
      ]
    },
    5: {
      title: "Semester V",
      description: "Advanced algorithmic structures, networking architectures, and modern web application layers.",
      subjects: [
        { code: "BTCOC501", name: "Design & Analysis of Algorithms", credits: 4, type: "Core" },
        { code: "BTCOC502", name: "Computer Networks", credits: 4, type: "Core" },
        { code: "BTCOC503", name: "Web Technologies", credits: 3, type: "Core" },
        { code: "BTCOE504", name: "Elective I (Human Computer Interaction)", credits: 3, type: "Elective" },
        { code: "BTCOL505", name: "Algorithms & Network Programming Lab", credits: 2, type: "Lab" },
        { code: "BTCOP506", name: "Mini Project I", credits: 1, type: "Project" }
      ]
    },
    6: {
      title: "Semester VI",
      description: "Language compilation principles, automation techniques, and data storage scaling concepts.",
      subjects: [
        { code: "BTCOC601", name: "Compiler Design", credits: 4, type: "Core" },
        { code: "BTCOC602", name: "Artificial Intelligence & ML", credits: 4, type: "Core" },
        { code: "BTCOE603", name: "Elective II (Mobile App Development)", credits: 3, type: "Elective" },
        { code: "BTCOE604", name: "Elective III (Internet of Things)", credits: 3, type: "Elective" },
        { code: "BTCOL605", name: "AI & Compiler Lab", credits: 2, type: "Lab" },
        { code: "BTCOS606", name: "Seminar", credits: 1, type: "Audit" }
      ]
    },
    7: {
      title: "Semester VII",
      description: "Large scale cloud infrastructure, data science workflows, and cryptography methods.",
      subjects: [
        { code: "BTCOC701", name: "Cloud Computing", credits: 4, type: "Core" },
        { code: "BTCOC702", name: "Cryptography & Network Security", credits: 4, type: "Core" },
        { code: "BTCOE703", name: "Elective IV (Big Data Analytics)", credits: 3, type: "Elective" },
        { code: "BTCOE704", name: "Elective V (Distributed Systems)", credits: 3, type: "Elective" },
        { code: "BTCOW705", name: "Industrial Training / Internship", credits: 2, type: "Project" },
        { code: "BTCOP706", name: "Major Project Phase I", credits: 2, type: "Project" }
      ]
    },
    8: {
      title: "Semester VIII",
      description: "Professional standards, entrepreneurship pathways, and final system integration validation.",
      subjects: [
        { code: "BTHMC801", name: "Professional Ethics & Cyber Law", credits: 3, type: "Core" },
        { code: "BTHMC802", name: "Entrepreneurship Development", credits: 3, type: "Core" },
        { code: "BTCOE803", name: "Elective VI (Deep Learning / NLP)", credits: 3, type: "Elective" },
        { code: "BTCOP804", name: "Major Project Phase II", credits: 6, type: "Project" }
      ]
    }
  },
  aids: {
    1: {
      title: "Semester I",
      description: "Foundational mathematics, physics, and basic engineering topics to build essential logical and analytical skills.",
      subjects: [
        { code: "BTBS101", name: "Engineering Mathematics I", credits: 4, type: "Core" },
        { code: "BTBS102", name: "Engineering Physics", credits: 4, type: "Core" },
        { code: "BTEST103", name: "Basic Electrical Engineering", credits: 3, type: "Core" },
        { code: "BTEST104", name: "Engineering Mechanics", credits: 3, type: "Core" },
        { code: "BTHM105", name: "Communication Skills", credits: 2, type: "Audit" },
        { code: "BTES106L", name: "Computer Programming in C Lab", credits: 2, type: "Lab" }
      ]
    },
    2: {
      title: "Semester II",
      description: "Introductory chemistry, environmental modeling, python programming, and basic mechanical workshops.",
      subjects: [
        { code: "BTBS201", name: "Engineering Mathematics II", credits: 4, type: "Core" },
        { code: "BTBS202", name: "Engineering Chemistry", credits: 4, type: "Core" },
        { code: "BTEST203", name: "Basic Civil & Mechanical Engineering", credits: 3, type: "Core" },
        { code: "BTEST204", name: "Engineering Graphics", credits: 3, type: "Core" },
        { code: "BTHM205", name: "Energy & Environmental Engineering", credits: 2, type: "Audit" },
        { code: "BTES206L", name: "Python for Data Science Lab", credits: 2, type: "Lab" }
      ]
    },
    3: {
      title: "Semester III",
      description: "Introduction to data science concepts, discrete logic, mathematical bases, and structured data handling.",
      subjects: [
        { code: "BTADS301", name: "Discrete Mathematical Structures", credits: 4, type: "Core" },
        { code: "BTADS302", name: "Data Structures using C++", credits: 4, type: "Core" },
        { code: "BTADS303", name: "Principles of Data Science", credits: 3, type: "Core" },
        { code: "BTADS304", name: "Digital Logic Design & Microprocessors", credits: 3, type: "Core" },
        { code: "BTADS305", name: "Object-Oriented Programming in Java", credits: 3, type: "Core" },
        { code: "BTADL306", name: "Data Structures & Java Lab", credits: 2, type: "Lab" }
      ]
    },
    4: {
      title: "Semester IV",
      description: "Fundamental relational databases, statistical probability models, and core system architectures.",
      subjects: [
        { code: "BTADS401", name: "Database Management Systems", credits: 4, type: "Core" },
        { code: "BTADS402", name: "Probability & Statistics", credits: 4, type: "Core" },
        { code: "BTADS403", name: "Operating Systems", credits: 3, type: "Core" },
        { code: "BTADS404", name: "Software Engineering & Agile Methodologies", credits: 3, type: "Core" },
        { code: "BTADS405", name: "Formal Language & Automata Theory", credits: 3, type: "Core" },
        { code: "BTADL406", name: "DBMS & R-Programming Lab", credits: 2, type: "Lab" }
      ]
    },
    5: {
      title: "Semester V",
      description: "Predictive machine learning models, distributed pipeline designs, and algorithm complexities.",
      subjects: [
        { code: "BTADS501", name: "Machine Learning", credits: 4, type: "Core" },
        { code: "BTADS502", name: "Computer Networks", credits: 4, type: "Core" },
        { code: "BTADS503", name: "Design & Analysis of Algorithms", credits: 3, type: "Core" },
        { code: "BTADE504", name: "Elective I (Data Visualization / R)", credits: 3, type: "Elective" },
        { code: "BTADL505", name: "ML Lab & Networking Lab", credits: 2, type: "Lab" },
        { code: "BTADP506", name: "Mini Project I", credits: 1, type: "Project" }
      ]
    },
    6: {
      title: "Semester VI",
      description: "Neural networks, intelligence frameworks, big data storage nodes, and language models.",
      subjects: [
        { code: "BTADS601", name: "Deep Learning", credits: 4, type: "Core" },
        { code: "BTADS602", name: "Artificial Intelligence", credits: 4, type: "Core" },
        { code: "BTADS603", name: "Big Data Analytics", credits: 3, type: "Core" },
        { code: "BTADE604", name: "Elective II (Natural Language Processing)", credits: 3, type: "Elective" },
        { code: "BTADL605", name: "AI & Deep Learning Lab", credits: 2, type: "Lab" },
        { code: "BTADS606", name: "Seminar", credits: 1, type: "Audit" }
      ]
    },
    7: {
      title: "Semester VII",
      description: "Advanced analytics pipelines, reinforcement loops, computer vision modeling, and initial phase capstone projects.",
      subjects: [
        { code: "BTADS701", name: "Reinforcement Learning", credits: 4, type: "Core" },
        { code: "BTADS702", name: "Computer Vision", credits: 4, type: "Core" },
        { code: "BTADE703", name: "Elective III (Internet of Things & Sensors)", credits: 3, type: "Elective" },
        { code: "BTADE704", name: "Elective IV (Social Media Analytics)", credits: 3, type: "Elective" },
        { code: "BTADW705", name: "Industrial Internship / Project Co-op", credits: 2, type: "Project" },
        { code: "BTADP706", name: "Major Project Phase I", credits: 2, type: "Project" }
      ]
    },
    8: {
      title: "Semester VIII",
      description: "System governance frameworks, generative models, and comprehensive thesis validation.",
      subjects: [
        { code: "BTHMC801", name: "AI Ethics, Governance & Cyber Laws", credits: 3, type: "Core" },
        { code: "BTHMC802", name: "Entrepreneurship Development", credits: 3, type: "Core" },
        { code: "BTADE803", name: "Elective V (Generative AI & LLMs)", credits: 3, type: "Elective" },
        { code: "BTADP804", name: "Major Project Phase II", credits: 6, type: "Project" }
      ]
    }
  },
  entc: {
    1: {
      title: "Semester I",
      description: "Foundational mathematics, physics, and basic engineering topics to build essential logical and analytical skills.",
      subjects: [
        { code: "BTBS101", name: "Engineering Mathematics I", credits: 4, type: "Core" },
        { code: "BTBS102", name: "Engineering Physics", credits: 4, type: "Core" },
        { code: "BTEST103", name: "Basic Electrical & Electronics Engineering", credits: 3, type: "Core" },
        { code: "BTEST104", name: "Engineering Mechanics", credits: 3, type: "Core" },
        { code: "BTHM105", name: "Communication Skills", credits: 2, type: "Audit" },
        { code: "BTES106L", name: "Basic Workshop Practice Lab", credits: 2, type: "Lab" }
      ]
    },
    2: {
      title: "Semester II",
      description: "Introductory chemistry, mechanical setups, drawing grids, and early programming steps.",
      subjects: [
        { code: "BTBS201", name: "Engineering Mathematics II", credits: 4, type: "Core" },
        { code: "BTBS202", name: "Engineering Chemistry", credits: 4, type: "Core" },
        { code: "BTEST203", name: "Basic Civil & Mechanical Engineering", credits: 3, type: "Core" },
        { code: "BTEST204", name: "Engineering Graphics", credits: 3, type: "Core" },
        { code: "BTHM205", name: "Energy & Environmental Engineering", credits: 2, type: "Audit" },
        { code: "BTES206L", name: "Programming in C Lab", credits: 2, type: "Lab" }
      ]
    },
    3: {
      title: "Semester III",
      description: "Fundamental semiconductor physics, electronic device behaviors, network models, and circuit designs.",
      subjects: [
        { code: "BTEXC301", name: "Electronic Devices & Circuits", credits: 4, type: "Core" },
        { code: "BTEXC302", name: "Network Theory", credits: 4, type: "Core" },
        { code: "BTEXC303", name: "Digital System Design", credits: 3, type: "Core" },
        { code: "BTEXC304", name: "Engineering Mathematics III", credits: 3, type: "Core" },
        { code: "BTEXC305", name: "Electronic Instrumentation", credits: 3, type: "Core" },
        { code: "BTEXL306", name: "Electronic Devices & Circuits Lab", credits: 2, type: "Lab" }
      ]
    },
    4: {
      title: "Semester IV",
      description: "Analog signals, linear operational amplifiers, electromagnetic fields, and hardware microcontrollers.",
      subjects: [
        { code: "BTEXC401", name: "Analog Communication", credits: 4, type: "Core" },
        { code: "BTEXC402", name: "Signals & Systems", credits: 4, type: "Core" },
        { code: "BTEXC403", name: "Linear Integrated Circuits", credits: 3, type: "Core" },
        { code: "BTEXC404", name: "Microcontrollers & Embedded Systems", credits: 3, type: "Core" },
        { code: "BTEXC405", name: "Electromagnetic Engineering", credits: 3, type: "Core" },
        { code: "BTEXL406", name: "Analog Communication & Microcontrollers Lab", credits: 2, type: "Lab" }
      ]
    },
    5: {
      title: "Semester V",
      description: "Digital communication encodings, control feedback loops, antennas, and wave propagation fields.",
      subjects: [
        { code: "BTEXC501", name: "Digital Communication", credits: 4, type: "Core" },
        { code: "BTEXC502", name: "Control Systems", credits: 4, type: "Core" },
        { code: "BTEXC503", name: "Antenna & Wave Propagation", credits: 3, type: "Core" },
        { code: "BTEXE504", name: "Elective I (Consumer Electronics)", credits: 3, type: "Elective" },
        { code: "BTEXL505", name: "Digital Comm & Control Systems Lab", credits: 2, type: "Lab" },
        { code: "BTEXP506", name: "Mini Project I", credits: 1, type: "Project" }
      ]
    },
    6: {
      title: "Semester VI",
      description: "Discrete Fourier transforms, microelectronic layouts, integrated optical fibers, and embedded code systems.",
      subjects: [
        { code: "BTEXC601", name: "Digital Signal Processing", credits: 4, type: "Core" },
        { code: "BTEXC602", name: "Embedded System Design", credits: 4, type: "Core" },
        { code: "BTEXC603", name: "VLSI Design & Technology", credits: 3, type: "Core" },
        { code: "BTEXE604", name: "Elective II (Fiber Optic Communication)", credits: 3, type: "Elective" },
        { code: "BTEXL605", name: "DSP & VLSI Lab", credits: 2, type: "Lab" },
        { code: "BTEXS606", name: "Seminar", credits: 1, type: "Audit" }
      ]
    },
    7: {
      title: "Semester VII",
      description: "High-frequency waveguides, cellular protocol systems, telemetry meshes, and initial hardware synthesis.",
      subjects: [
        { code: "BTEXC701", name: "Microwave Engineering", credits: 4, type: "Core" },
        { code: "BTEXC702", name: "Wireless Communication", credits: 4, type: "Core" },
        { code: "BTEXE703", name: "Elective III (Internet of Things & Sensors)", credits: 3, type: "Elective" },
        { code: "BTEXE704", name: "Elective IV (Digital Image Processing)", credits: 3, type: "Elective" },
        { code: "BTEXW705", name: "Industrial Training & Internship", credits: 2, type: "Project" },
        { code: "BTEXP706", name: "Major Project Phase I", credits: 2, type: "Project" }
      ]
    },
    8: {
      title: "Semester VIII",
      description: "Satellite link paths, radar transceivers, professional standards, and operational deployments.",
      subjects: [
        { code: "BTHMC801", name: "Professional Ethics & Cyber Law", credits: 3, type: "Core" },
        { code: "BTHMC802", name: "Entrepreneurship Development", credits: 3, type: "Core" },
        { code: "BTEXE803", name: "Elective V (Satellite & Radar Communication)", credits: 3, type: "Elective" },
        { code: "BTEXP804", name: "Major Project Phase II", credits: 6, type: "Project" }
      ]
    }
  },
  it: {
    1: {
      title: "Semester I",
      description: "Foundational mathematics, physics, and basic engineering topics to build essential logical and analytical skills.",
      subjects: [
        { code: "BTBS101", name: "Engineering Mathematics I", credits: 4, type: "Core" },
        { code: "BTBS102", name: "Engineering Physics", credits: 4, type: "Core" },
        { code: "BTEST103", name: "Basic Electrical & Electronics Engineering", credits: 3, type: "Core" },
        { code: "BTEST104", name: "Engineering Mechanics", credits: 3, type: "Core" },
        { code: "BTHM105", name: "Communication Skills", credits: 2, type: "Audit" },
        { code: "BTES106L", name: "Computer Programming in C Lab", credits: 2, type: "Lab" }
      ]
    },
    2: {
      title: "Semester II",
      description: "Engineering chemistry, civil mechanics, drafting layouts, and fundamental scripting tools.",
      subjects: [
        { code: "BTBS201", name: "Engineering Mathematics II", credits: 4, type: "Core" },
        { code: "BTBS202", name: "Engineering Chemistry", credits: 4, type: "Core" },
        { code: "BTEST203", name: "Basic Civil & Mechanical Engineering", credits: 3, type: "Core" },
        { code: "BTEST204", name: "Engineering Graphics", credits: 3, type: "Core" },
        { code: "BTHM205", name: "Energy & Environmental Engineering", credits: 2, type: "Audit" },
        { code: "BTES206L", name: "Programming Lab II (Python)", credits: 2, type: "Lab" }
      ]
    },
    3: {
      title: "Semester III",
      description: "Logical structures, data structures, digital gates, Java classes, and processor pipelines.",
      subjects: [
        { code: "BTITC301", name: "Discrete Mathematics", credits: 4, type: "Core" },
        { code: "BTITC302", name: "Data Structures & Algorithms", credits: 4, type: "Core" },
        { code: "BTITC303", name: "Digital Logic Design & Circuit Theory", credits: 3, type: "Core" },
        { code: "BTITC304", name: "Object-Oriented Programming (Java)", credits: 3, type: "Core" },
        { code: "BTITC305", name: "Computer Organization & Architecture", credits: 3, type: "Core" },
        { code: "BTITL306", name: "Data Structures & OOP Lab", credits: 2, type: "Lab" }
      ]
    },
    4: {
      title: "Semester IV",
      description: "Underlying software systems, database structures, web scripting, and software modeling standards.",
      subjects: [
        { code: "BTITC401", name: "Operating Systems", credits: 4, type: "Core" },
        { code: "BTITC402", name: "Database Management Systems", credits: 4, type: "Core" },
        { code: "BTITC403", name: "Web Technologies I (HTML/CSS/JS)", credits: 3, type: "Core" },
        { code: "BTITC404", name: "Software Engineering & SDLC", credits: 3, type: "Core" },
        { code: "BTITC405", name: "Theory of Computation", credits: 3, type: "Core" },
        { code: "BTITL406", name: "Database & Web Development Lab", credits: 2, type: "Lab" }
      ]
    },
    5: {
      title: "Semester V",
      description: "Advanced networking protocols, web servers, scripting languages, and containerization frameworks.",
      subjects: [
        { code: "BTITC501", name: "Computer Networks", credits: 4, type: "Core" },
        { code: "BTITC502", name: "Design & Analysis of Algorithms", credits: 4, type: "Core" },
        { code: "BTITC503", name: "Web Technologies II (React/Node)", credits: 3, type: "Core" },
        { code: "BTITE504", name: "Elective I (Cloud Infrastructure & Services)", credits: 3, type: "Elective" },
        { code: "BTITL505", name: "Advanced Web & Networking Lab", credits: 2, type: "Lab" },
        { code: "BTITP506", name: "Mini Project I", credits: 1, type: "Project" }
      ]
    },
    6: {
      title: "Semester VI",
      description: "Security layers, server automation, distributed databases, and testing processes.",
      subjects: [
        { code: "BTITC601", name: "Information Security", credits: 4, type: "Core" },
        { code: "BTITC602", name: "DevOps & Cloud Automation", credits: 4, type: "Core" },
        { code: "BTITC603", name: "Distributed Systems & Databases", credits: 3, type: "Core" },
        { code: "BTITE604", name: "Elective II (Software Testing & QA)", credits: 3, type: "Elective" },
        { code: "BTITL605", name: "DevOps & InfoSec Lab", credits: 2, type: "Lab" },
        { code: "BTITS606", name: "Seminar", credits: 1, type: "Audit" }
      ]
    },
    7: {
      title: "Semester VII",
      description: "Big data platforms, mobile apps, secure cryptosystems, and initial integration.",
      subjects: [
        { code: "BTITC701", name: "Big Data Engineering", credits: 4, type: "Core" },
        { code: "BTITC702", name: "Mobile Computing & Applications", credits: 4, type: "Core" },
        { code: "BTITE703", name: "Elective III (Cryptography & Cyber Security)", credits: 3, type: "Elective" },
        { code: "BTITE704", name: "Elective IV (Data Mining & Warehousing)", credits: 3, type: "Elective" },
        { code: "BTITW705", name: "Industrial Internship / Co-op", credits: 2, type: "Project" },
        { code: "BTITP706", name: "Major Project Phase I", credits: 2, type: "Project" }
      ]
    },
    8: {
      title: "Semester VIII",
      description: "Decentralized ledgers, enterprise platforms, business analytics, and thesis evaluation.",
      subjects: [
        { code: "BTHMC801", name: "Professional Ethics & Intellectual Property", credits: 3, type: "Core" },
        { code: "BTHMC802", name: "Enterprise Resource Planning (ERP)", credits: 3, type: "Core" },
        { code: "BTITE803", name: "Elective V (Blockchain Technology / AI)", credits: 3, type: "Elective" },
        { code: "BTITP804", name: "Major Project Phase II", credits: 6, type: "Project" }
      ]
    }
  },
  fe: {
    1: {
      title: "Semester I",
      description: "Foundational mathematics, physics, and basic engineering topics to build essential logical and analytical skills.",
      subjects: [
        { code: "BTBS101", name: "Engineering Mathematics I", credits: 4, type: "Core" },
        { code: "BTBS102", name: "Engineering Physics", credits: 4, type: "Core" },
        { code: "BTEST103", name: "Basic Electrical & Electronics Engineering", credits: 3, type: "Core" },
        { code: "BTEST104", name: "Engineering Mechanics", credits: 3, type: "Core" },
        { code: "BTHM105", name: "Communication Skills", credits: 2, type: "Audit" },
        { code: "BTES106L", name: "Computer Programming in C Lab", credits: 2, type: "Lab" }
      ]
    },
    2: {
      title: "Semester II",
      description: "Advanced foundational courses establishing basics in physical sciences, engineering drawing, and mechanical components.",
      subjects: [
        { code: "BTBS201", name: "Engineering Mathematics II", credits: 4, type: "Core" },
        { code: "BTBS202", name: "Engineering Chemistry", credits: 4, type: "Core" },
        { code: "BTEST203", name: "Basic Civil & Mechanical Engineering", credits: 3, type: "Core" },
        { code: "BTEST204", name: "Engineering Graphics", credits: 3, type: "Core" },
        { code: "BTHM205", name: "Energy & Environmental Engineering", credits: 2, type: "Audit" },
        { code: "BTES206L", name: "Programming Lab II (Python)", credits: 2, type: "Lab" }
      ]
    }
  }
};

const YEARS = [
  { label: "1st Year", val: 1, sems: [1, 2], name: "First Year (FY)" },
  { label: "2nd Year", val: 2, sems: [3, 4], name: "Second Year (SY)" },
  { label: "3rd Year", val: 3, sems: [5, 6], name: "Third Year (TY)" },
  { label: "4th Year", val: 4, sems: [7, 8], name: "Final Year (B.Tech)" }
];

interface AcademicTreeProps {
  dept: {
    id: string;
    name: string;
    color: string;
  };
}

export default function AcademicTree({ dept }: AcademicTreeProps) {
  const [isBtechExpanded, setIsBtechExpanded] = useState(false);
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const deptId = dept.id || "cse";
  const color = dept.color || "blue";

  // Dynamic Theme Colors
  const themeColors: Record<string, {
    primary: string;
    text: string;
    border: string;
    bg: string;
    glow: string;
    badgeBg: string;
    badgeText: string;
  }> = {
    blue: {
      primary: "from-blue-600 to-indigo-600",
      text: "text-blue-500",
      border: "border-blue-500",
      bg: "bg-blue-500",
      glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
      badgeBg: "bg-blue-50 dark:bg-blue-950/40",
      badgeText: "text-blue-600 dark:text-blue-400"
    },
    violet: {
      primary: "from-violet-600 to-fuchsia-600",
      text: "text-violet-500",
      border: "border-violet-500",
      bg: "bg-violet-500",
      glow: "shadow-[0_0_15px_rgba(139,92,246,0.5)]",
      badgeBg: "bg-violet-50 dark:bg-violet-950/40",
      badgeText: "text-violet-600 dark:text-violet-400"
    },
    emerald: {
      primary: "from-emerald-600 to-teal-600",
      text: "text-emerald-500",
      border: "border-emerald-500",
      bg: "bg-emerald-500",
      glow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]",
      badgeBg: "bg-emerald-50 dark:bg-emerald-950/40",
      badgeText: "text-emerald-600 dark:text-emerald-400"
    },
    orange: {
      primary: "from-orange-600 to-amber-600",
      text: "text-orange-500",
      border: "border-orange-500",
      bg: "bg-orange-500",
      glow: "shadow-[0_0_15px_rgba(249,115,22,0.5)]",
      badgeBg: "bg-orange-50 dark:bg-orange-950/40",
      badgeText: "text-orange-600 dark:text-orange-400"
    },
    rose: {
      primary: "from-rose-600 to-pink-600",
      text: "text-rose-500",
      border: "border-rose-500",
      bg: "bg-rose-500",
      glow: "shadow-[0_0_15px_rgba(244,63,94,0.5)]",
      badgeBg: "bg-rose-50 dark:bg-rose-950/40",
      badgeText: "text-rose-600 dark:text-rose-400"
    }
  };

  const theme = themeColors[color] || themeColors.blue;

  // Active path logic
  const isTrunkActive = isBtechExpanded;
  const isYearActive = (yearVal: number) => isBtechExpanded && expandedYear === yearVal;
  const isSemesterActive = (semVal: number) => isBtechExpanded && selectedSemester === semVal;

  const yearsToRender = deptId === "fe" ? YEARS.slice(0, 1) : YEARS;

  const currentSyllabus = SYLLABUS_DATA[deptId] || SYLLABUS_DATA.cse;
  const activeSyllabus = currentSyllabus[selectedSemester] || currentSyllabus[1];

  const handleBtechClick = () => {
    const nextState = !isBtechExpanded;
    setIsBtechExpanded(nextState);
    if (nextState) {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  };

  const handleYearClick = (yearVal: number) => {
    if (expandedYear === yearVal) {
      setExpandedYear(null);
    } else {
      setExpandedYear(yearVal);
      // Auto select the first semester of that year
      const firstSemOfSelectedYear = yearVal === 1 ? 1 : yearVal === 2 ? 3 : yearVal === 3 ? 5 : 7;
      setSelectedSemester(firstSemOfSelectedYear);
    }
  };

  const getTypeColor = (type: Subject["type"]) => {
    switch (type) {
      case "Core": return "bg-primary/10 text-primary border-primary/20";
      case "Elective": return "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400";
      case "Lab": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400";
      case "Project": return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400";
      default: return "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400";
    }
  };

  return (
    <div className="space-y-12">
      {/* Horizontal scroll container for the tree layout */}
      <div className="w-full overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        <div ref={scrollRef} className="flex flex-row items-center justify-start w-max px-4 py-8 md:px-12 pr-24">
          
          {/* ROOT NODE: BTECH */}
          <div className="relative z-10 shrink-0">
            <button
              onClick={handleBtechClick}
              className={`relative px-6 py-4 rounded-2xl font-extrabold text-lg tracking-wider transition-all duration-300 flex flex-row items-center gap-3 border shadow-md hover:scale-105 active:scale-95 ${
                isBtechExpanded 
                  ? `bg-slate-900 border-slate-800 text-white dark:bg-white dark:text-slate-900 dark:border-white ${theme.glow}` 
                  : "bg-white border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <GraduationCap className={`h-6 w-6 ${isBtechExpanded ? theme.text : "text-slate-500"}`} />
                <span>BTECH</span>
              </div>
              {isBtechExpanded ? <ChevronLeft className="h-5 w-5 opacity-70" /> : <ChevronRight className="h-5 w-5 opacity-70" />}
            </button>
          </div>

          {/* MAIN TRUNK CONNECTOR */}
          <div className="w-12 h-px relative shrink-0">
            <div className={`absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 transition-colors duration-500 ${
              isTrunkActive ? theme.bg : "bg-slate-300 dark:bg-slate-800"
            }`} />
          </div>

          {/* YEARS LEVEL */}
          <div className="flex-1">
            <AnimatePresence initial={false}>
              {isBtechExpanded && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-6 w-max relative">
                    {deptId !== "fe" && (
                      <div className="absolute top-0 bottom-0 left-0 w-8 z-0">
                         {/* Top half of vertical line (from row 0 to center) */}
                         <div className={`absolute top-[40px] bottom-1/2 left-4 w-0.5 transition-colors duration-500 ${
                           isYearActive(1) || isYearActive(2) ? theme.bg : "bg-slate-300 dark:bg-slate-800"
                         }`} />
                         {/* Bottom half of vertical line (from center to row 3) */}
                         <div className={`absolute top-1/2 bottom-[40px] left-4 w-0.5 transition-colors duration-500 ${
                           isYearActive(3) || isYearActive(4) ? theme.bg : "bg-slate-300 dark:bg-slate-800"
                         }`} />
                      </div>
                    )}

                    {yearsToRender.map((year, idx) => {
                      const isActive = isYearActive(year.val);
                      return (
                        <div key={idx} className="flex flex-row items-center h-[80px] relative z-10 pl-8">
                           {/* Horizontal branch to this year */}
                           <div className={`absolute left-4 w-4 top-1/2 h-0.5 -translate-y-1/2 transition-colors duration-500 ${
                             isActive ? theme.bg : "bg-slate-300 dark:bg-slate-800"
                           }`} />

                           {/* Year Card Button */}
                           <button
                             onClick={() => handleYearClick(year.val)}
                             className={`relative w-[140px] py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 border flex flex-col items-center gap-1 shadow-sm shrink-0 hover:translate-x-1 ${
                               isActive
                                 ? `bg-white border-slate-900 text-slate-900 dark:bg-slate-900 dark:border-white dark:text-white ${theme.glow}`
                                 : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 dark:bg-slate-900/40 dark:border-slate-800/80 dark:text-slate-400 dark:hover:text-slate-200"
                             }`}
                           >
                             <span className="text-[10px] tracking-widest uppercase opacity-60">{year.name}</span>
                             <span className="text-base font-extrabold">{year.label}</span>
                           </button>

                           {/* Semesters connector and nodes */}
                           <div className="overflow-hidden flex flex-row items-center h-full">
                             <AnimatePresence initial={false}>
                               {isActive && (
                                 <motion.div
                                   initial={{ width: 0, opacity: 0 }}
                                   animate={{ width: "auto", opacity: 1 }}
                                   exit={{ width: 0, opacity: 0 }}
                                   transition={{ duration: 0.3 }}
                                   className="flex flex-row items-center h-full"
                                 >
                                    {/* Horizontal line out of year */}
                                    <div className={`w-8 h-0.5 transition-colors duration-500 shrink-0 ${theme.bg}`} />

                                    {/* Semesters vertical split wire */}
                                    <div className="h-[70px] w-8 relative shrink-0">
                                      {/* Vertical line spanning the two sems */}
                                      <div className={`absolute top-[15px] bottom-[15px] left-1/2 w-0.5 -translate-x-1/2 transition-colors duration-500 ${
                                        isSemesterActive(year.sems[0]) || isSemesterActive(year.sems[1]) ? theme.bg : "bg-slate-300 dark:bg-slate-800"
                                      }`} />
                                      {/* Top horiz branch */}
                                      <div className={`absolute top-[15px] left-1/2 right-0 h-0.5 -translate-y-1/2 transition-colors duration-500 ${
                                        isSemesterActive(year.sems[0]) ? theme.bg : "bg-slate-300 dark:bg-slate-800"
                                      }`} />
                                      {/* Bottom horiz branch */}
                                      <div className={`absolute bottom-[15px] left-1/2 right-0 h-0.5 translate-y-1/2 transition-colors duration-500 ${
                                        isSemesterActive(year.sems[1]) ? theme.bg : "bg-slate-300 dark:bg-slate-800"
                                      }`} />
                                    </div>

                                    {/* Semesters Column */}
                                    <div className="flex flex-col justify-between h-[70px] shrink-0">
                                      {year.sems.map((semVal) => {
                                        const isSemActive = isSemesterActive(semVal);
                                        return (
                                          <button
                                            key={semVal}
                                            onClick={() => {
                                              setSelectedSemester(semVal);
                                            }}
                                            className={`px-4 py-1 rounded-lg text-xs font-bold transition-all duration-300 border flex flex-col items-center justify-center gap-0.5 shadow-sm hover:scale-105 active:scale-95 h-[30px] shrink-0 ${
                                              isSemActive
                                                ? `bg-slate-900 border-slate-800 text-white dark:bg-white dark:text-slate-900 dark:border-white ${theme.glow}`
                                                : `bg-white border-slate-200 text-slate-700 hover:border-${color}-200 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300`
                                            }`}
                                          >
                                            <div className="flex items-center gap-1.5">
                                              <span className="opacity-50 text-[9px] uppercase tracking-wider">Sem</span>
                                              <span className="text-sm font-extrabold">{semVal}</span>
                                            </div>
                                          </button>
                                        );
                                      })}
                                    </div>
                                 </motion.div>
                               )}
                             </AnimatePresence>
                           </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* INLINE SYLLABUS PANE */}
          <div className="shrink-0 w-[600px] ml-16 transition-all duration-500 flex items-start self-center h-auto">
            <AnimatePresence mode="wait">
              {isBtechExpanded && expandedYear && (
                <motion.div
                  key={selectedSemester}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col"
                >
                  <div className={`p-4 bg-gradient-to-r ${theme.primary} text-white flex items-center justify-between gap-2 shrink-0`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-white/20 text-white border border-white/30 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
                          Semester {selectedSemester}
                        </span>
                      </div>
                      <h3 className="text-lg font-black tracking-tight flex items-center gap-1.5">
                        <Layers className="h-4 w-4 shrink-0" />
                        {activeSyllabus.title}
                      </h3>
                    </div>
                    <div className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl text-center">
                      <div className="text-[9px] uppercase font-bold tracking-widest text-white/70">Credits</div>
                      <div className="text-xl font-black">
                        {activeSyllabus.subjects.reduce((sum, s) => sum + s.credits, 0)}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                      {activeSyllabus.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {activeSyllabus.subjects.map((sub, i) => (
                        <div key={i} className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 border border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700 transition-colors flex flex-col justify-between h-full">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-mono text-[10px] font-bold text-slate-500 dark:text-slate-400">{sub.code}</span>
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getTypeColor(sub.type)}`}>
                              {sub.type}
                            </span>
                          </div>
                          <div className="flex justify-between items-end gap-2 mt-auto">
                            <div className="font-bold text-sm text-slate-900 dark:text-slate-200 flex-1 leading-tight flex items-start gap-1.5">
                              <BookOpen className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${theme.text}`} />
                              <span className="line-clamp-2" title={sub.name}>{sub.name}</span>
                            </div>
                            <div className="font-bold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1 bg-white dark:bg-slate-950 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
                              <Clock className="h-3 w-3 opacity-50" />
                              {sub.credits}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
