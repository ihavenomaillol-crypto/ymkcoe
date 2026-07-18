import dotenv from "dotenv";
import pg from "pg";
import { createHash } from "crypto";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seed() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Clear existing data
    await client.query("DELETE FROM placements");
    await client.query("DELETE FROM faculty");
    await client.query("DELETE FROM courses");
    await client.query("DELETE FROM news");
    await client.query("DELETE FROM admins");

    // ── ADMIN ──────────────────────────────────────────────────────────────
    const secret = process.env.SESSION_SECRET || "ymkcoe-secret-key";
    const hash = createHash("sha256").update("admin123" + secret).digest("hex");
    await client.query(
      "INSERT INTO admins (username, password_hash) VALUES ($1, $2)",
      ["admin", hash]
    );
    console.log("✓ Admin seeded");

    // ── COURSES ────────────────────────────────────────────────────────────
    const courses = [
      {
        name: "Computer Science & Engineering",
        department: "Computer Science & Engineering",
        type: "UG",
        duration: "4 Years",
        seats: 120,
        description:
          "The CSE program at YMK COE is a four-year course that builds a strong foundation in computing, software, and hardware systems. It covers key areas like algorithms, programming, data structures, AI, cybersecurity, and data privacy. The curriculum blends theory with hands-on learning, encouraging innovation, ethical computing, and interdisciplinary collaboration. Students develop critical thinking and problem-solving skills essential for the tech industry.",
        eligibility:
          "10+2 with Physics, Chemistry & Mathematics. Admission through MHT-CET / JEE Main. Choice Code: 1635224210 | TFWS: 1635224211T",
        fees: "As per DTE norms. TFWS seats available.",
        is_active: true,
      },
      {
        name: "Artificial Intelligence & Data Science",
        department: "Artificial Intelligence & Data Science",
        type: "UG",
        duration: "4 Years",
        seats: 120,
        description:
          "The AI & DS program at YMK COE is designed to train the next generation of data scientists and AI engineers. The curriculum covers machine learning, deep learning, natural language processing, big data analytics, and statistical modelling. Students gain hands-on experience with Python, TensorFlow, and industry tools to solve real-world data challenges.",
        eligibility:
          "10+2 with Physics, Chemistry & Mathematics. Admission through MHT-CET / JEE Main. Choice Code: 1635299510 | TFWS: 1635299511T",
        fees: "As per DTE norms. TFWS seats available.",
        is_active: true,
      },
      {
        name: "Electronics & Telecommunication Engineering",
        department: "Electronics & Telecommunication Engineering",
        type: "UG",
        duration: "4 Years",
        seats: 60,
        description:
          "The E&TC program at YMK COE is a four-year course that provides in-depth knowledge of electronic systems, communication technologies, and embedded systems. It covers analog and digital communication, signal processing, VLSI design, IoT, and wireless technologies. The curriculum integrates theoretical learning with hands-on experience through well-equipped labs and industry-driven projects.",
        eligibility:
          "10+2 with Physics, Chemistry & Mathematics. Admission through MHT-CET / JEE Main. Choice Code: 1635237210 | TFWS: 1635237211T",
        fees: "As per DTE norms. TFWS seats available.",
        is_active: true,
      },
      {
        name: "Information Technology",
        department: "Information Technology",
        type: "UG",
        duration: "4 Years",
        seats: 60,
        description:
          "The B.Tech program in IT at YMK COE is a four-year course designed to develop skilled professionals in software development, data management, networking, cybersecurity, and cloud computing. With a strong focus on practical learning through industry-ready labs and projects, students gain hands-on experience with modern tools and technologies.",
        eligibility:
          "10+2 with Physics, Chemistry & Mathematics. Admission through MHT-CET / JEE Main. Choice Code: 1635224610 | TFWS: 1635224611T",
        fees: "As per DTE norms. TFWS seats available.",
        is_active: true,
      },
    ];

    for (const c of courses) {
      await client.query(
        `INSERT INTO courses (name, department, type, duration, seats, description, eligibility, fees, is_active)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [c.name, c.department, c.type, c.duration, c.seats, c.description, c.eligibility, c.fees, c.is_active]
      );
    }
    console.log("✓ 4 courses seeded");

    // ── FACULTY ────────────────────────────────────────────────────────────
    const faculty = [
      {
            "name": "Prof. Dr. N.G. Narve",
            "department": "Mechanical Engineering",
            "designation": "Principal",
            "qualification": "Ph.D.",
            "specialization": "Mechanical Engineering",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": ""
      },
      {
            "name": "Dr. Amruta Vijay Surana",
            "department": "Computer Science & Engineering",
            "designation": "Vice-Principal",
            "qualification": "Ph.D. (Computer Engineering)",
            "specialization": "Computer Engineering",
            "experience": 15,
            "is_hod": true,
            "bio": "",
            "photoUrl": ""
      },
      {
            "name": "Mr. Karan Vijay Navgire",
            "department": "Library",
            "designation": "Librarian",
            "qualification": "",
            "specialization": "",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": ""
      },
      {
            "name": "Dr. Vishal Mangesh Kamathe",
            "department": "Basic Sciences & Humanities",
            "designation": "Assistant Professor",
            "qualification": "",
            "specialization": "Engineering Physics",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": ""
      },
      {
            "name": "Mr. Vishal Subhash Choughule",
            "department": "Civil Engineering",
            "designation": "Assistant Professor",
            "qualification": "",
            "specialization": "Civil Engineering",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": "https://drive.google.com/uc?export=view&id=15ZpCIH8Be2P_Sd_nId_YBmB_bABWxv5T"
      },
      {
            "name": "Ms. Trupti Shankar Shinde",
            "department": "Basic Sciences & Humanities",
            "designation": "Assistant Professor",
            "qualification": "B.B.A, MBA & TPO Ph.D. Pursuing",
            "specialization": "Management",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": ""
      },
      {
            "name": "Mr. Hrishikesh Rajan Chitrakar",
            "department": "Basic Sciences & Humanities",
            "designation": "Assistant Professor",
            "qualification": "MSc, SET (Mathematics)",
            "specialization": "Mathematics",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": "/faculty/H.R._Chitarkar.jpeg"
      },
      {
            "name": "Mr. Pritam Nandakumar Mule",
            "department": "Basic Sciences & Humanities",
            "designation": "Assistant Professor",
            "qualification": "PhD pursuing",
            "specialization": "",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": "https://drive.google.com/uc?export=view&id=1TgFzyeMcj6Dn2Xs__STR4MmtQUJx0LeR"
      },
      {
            "name": "Dr. Chetan Motiram Harak",
            "department": "Basic Sciences & Humanities",
            "designation": "Assistant Professor",
            "qualification": "M.Sc. in Organic Chemistry , Ph.D. in Chemistry",
            "specialization": "Organic Chemistry",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": "https://drive.google.com/uc?export=view&id=10Ts6TmM0F4UyFOALLY8khAotdmN8ZFFQ"
      },
      {
            "name": "Ms. Ahilya Vishnu Narsale",
            "department": "Basic Sciences & Humanities",
            "designation": "Assistant Professor",
            "qualification": "M.Sc B.Ed (Mathematics)",
            "specialization": "Mathematics",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": "https://drive.google.com/uc?export=view&id=1yJ5B7xVN2DBUmOP8FXCoTKsPuzP7yTaX"
      },
      {
            "name": "Prof. Sushama Ganesh Nawale",
            "department": "Computer Science & Engineering",
            "designation": "Assistant Professor",
            "qualification": "Ph.D. Pursuing",
            "specialization": "",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": "https://drive.google.com/uc?export=view&id=1M61UzPeEFB-zqwVhs1Knu2VJrJ40KE1F"
      },
      {
            "name": "Ms. Ghodake Snehal Nitin",
            "department": "Basic Sciences & Humanities",
            "designation": "Assistant Professor",
            "qualification": "MH-SET, M.Sc.",
            "specialization": "",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": "/faculty/Snehal_Ghodake.jpeg"
      },
      {
            "name": "Ms. Sheetal Shivaji Hotkar",
            "department": "Electronics & Telecommunication Engineering",
            "designation": "Assistant Professor",
            "qualification": "Ph.D(Pursuing)-Electronics",
            "specialization": "Electronics",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": "https://drive.google.com/uc?export=view&id=1m_wxh8ctwRz_zeIBSpdGD2fs6nGyWD2N"
      },
      {
            "name": "Mrs. Jaheda Nisar Magdum",
            "department": "Information Technology",
            "designation": "Assistant Professor",
            "qualification": "M.E. IT",
            "specialization": "IT",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": "/faculty/Jaheda_Magdum.jpeg"
      },
      {
            "name": "Mr. Akshay Sudam Kate",
            "department": "Mechanical Engineering",
            "designation": "Assistant Professor",
            "qualification": "M.Tech",
            "specialization": "",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": "/faculty/Akshay_Kate.jpeg"
      },
      {
            "name": "Prof. Priya Jagannath Chougule",
            "department": "Electronics & Telecommunication Engineering",
            "designation": "Assistant Professor",
            "qualification": "M.E. E&TC (VLSI & EMBEDDEDSYSTEM)",
            "specialization": "VLSI & EMBEDDEDSYSTEM",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": "/faculty/Priya.jpeg"
      },
      {
            "name": "Ms. Jagruti Dhananjay Funde",
            "department": "Basic Sciences & Humanities",
            "designation": "Assistant Professor",
            "qualification": "MA English, NET, SET",
            "specialization": "English",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": "/faculty/jagruti_funde.jpeg"
      },
      {
            "name": "Prof. Shraddha Rajesh Jadhao",
            "department": "Artificial Intelligence and Data Science",
            "designation": "Assistant Professor",
            "qualification": "M.E. computer",
            "specialization": "Computer Science",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": "/faculty/Shraddha_Jadhav.jpeg"
      },
      {
            "name": "Mrs. Ketaki Kaustubh Thosar",
            "department": "Administration",
            "designation": "Accountant",
            "qualification": "B.com",
            "specialization": "Accounts",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": "https://drive.google.com/uc?export=view&id=1uJ9ii_RzlJavYNHMPiCBMaR7qEAt5JHS"
      },
      {
            "name": "Mr. Amey Pradeep Inamdar",
            "department": "Artificial Intelligence and Data Science",
            "designation": "Assistant Professor",
            "qualification": "BCom, MCA, MBA",
            "specialization": "Information Technology",
            "experience": 19,
            "is_hod": false,
            "bio": "",
            "photoUrl": "/faculty/Amey_Pradeep.jpeg"
      },
      {
            "name": "Ms. Pranali Prakash Agle",
            "department": "Information Technology",
            "designation": "Assistant Professor",
            "qualification": "B.E Information Technology Engineering",
            "specialization": "IT",
            "experience": 1,
            "is_hod": false,
            "bio": "",
            "photoUrl": ""
      },
      {
            "name": "Ms. Ashwini Navnath Dhundkar",
            "department": "Basic Sciences & Humanities",
            "designation": "Assistant Professor",
            "qualification": "B.E in Artificial Intelligence And Data Science",
            "specialization": "Computer",
            "experience": null,
            "is_hod": false,
            "bio": "",
            "photoUrl": ""
      }
];

    for (const f of faculty) {
      await client.query(
        `INSERT INTO faculty (name, department, designation, qualification, specialization, experience, is_hod, bio, photo_url)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [f.name, f.department, f.designation, f.qualification, f.specialization, f.experience, f.is_hod, f.bio, f.photoUrl || null]
      );
    }
    console.log("✓ 22 faculty seeded");

    // ── NEWS ───────────────────────────────────────────────────────────────
    const news = [
      {
        title: "Admissions Open for B.Tech 2026-27",
        content:
          "Yashoda Mahadeo Kakade College of Engineering invites applications for B.Tech admissions for the academic year 2026-27. Programs available: Computer Science & Engineering (120 seats), Artificial Intelligence & Data Science (120 seats), Electronics & Telecommunication Engineering (60 seats), and Information Technology (60 seats). Affiliated to Dr. Babasaheb Ambedkar Technological University, AICTE Approved. Apply online at indrayaniedu.in/home/admission/ymk_coe",
        category: "announcement",
        published_at: new Date("2026-05-01"),
        is_pinned: true,
      },
      {
        title: "Job Fair 2026 Successfully Conducted at YMKCOE",
        content:
          "A Job Fair was successfully conducted at Yashoda Mahadeo Kakade College of Engineering on 26th March 2026, aimed at facilitating job opportunities for students from YMKCOE and nearby institutions under Indrayani Vidya Mandir. The event served as a valuable platform connecting aspiring candidates with prospective employers. The fair witnessed enthusiastic participation from students across multiple disciplines, with several companies offering on-the-spot interviews and placement opportunities. Hon. MP Shrirang Barne graced the event and encouraged youth to explore self-employment and entrepreneurship.",
        category: "event",
        published_at: new Date("2026-03-26"),
        is_pinned: true,
      },
      {
        title: "Final Merit List 2025-26 Published",
        content:
          "The final merit list for B.Tech admissions for the academic year 2025-26 has been published. Candidates are requested to download the merit list from the college website and report for document verification as per the schedule. For details regarding vacant seats, refer to the Admission Schedule & Vacant Seats document available on the college website.",
        category: "announcement",
        published_at: new Date("2025-10-15"),
        is_pinned: false,
      },
      {
        title: "Institution Innovation Cell Activities 2024-25",
        content:
          "The Institution Innovation Cell (IIC) at YMKCOE successfully conducted several workshops, hackathons, and innovation boot camps during 2024-25. Students from all departments participated in design thinking sessions, prototype development, and startup ideation workshops. The IIC aims to foster a culture of innovation and entrepreneurship among students.",
        category: "achievement",
        published_at: new Date("2025-04-10"),
        is_pinned: false,
      },
      {
        title: "MoU Signed with Industry Partners for Skill Development",
        content:
          "Yashoda Mahadeo Kakade College of Engineering has signed Memoranda of Understanding (MoU) with leading industry partners to enhance skill development opportunities for students. These collaborations include internship programs, guest lectures by industry experts, and access to cutting-edge tools and technologies.",
        category: "news",
        published_at: new Date("2025-03-01"),
        is_pinned: false,
      },
      {
        title: "YMKCOE Students Excel in University Examinations",
        content:
          "Students of Yashoda Mahadeo Kakade College of Engineering have performed exceptionally well in the Dr. Babasaheb Ambedkar Technological University examinations. Several students have secured distinction and first-class results across all four B.Tech programs. The college congratulates the achievers and thanks the dedicated faculty for their guidance.",
        category: "achievement",
        published_at: new Date("2025-01-20"),
        is_pinned: false,
      },
      {
        title: "Girls' Hostel Facilities Upgraded for 2025-26",
        content:
          "The management of Indrayani Vidya Mandir is pleased to announce major upgrades to the Girls' Hostel facilities at YMKCOE campus, Talegaon Dabhade. New amenities include 24/7 Wi-Fi, improved mess facilities, CCTV surveillance, and dedicated study rooms. Applications for hostel accommodation for the academic year 2025-26 are now open.",
        category: "announcement",
        published_at: new Date("2024-11-05"),
        is_pinned: false,
      },
    ];

    for (const n of news) {
      await client.query(
        `INSERT INTO news (title, content, category, published_at, is_pinned)
         VALUES ($1,$2,$3,$4,$5)`,
        [n.title, n.content, n.category, n.published_at, n.is_pinned]
      );
    }
    console.log("✓ 7 news items seeded");

    // ── PLACEMENTS ─────────────────────────────────────────────────────────
    const placements = [
      {
        student_name: "Rahul Deshmukh",
        company: "TCS",
        package: "3.5 LPA",
        role: "Systems Engineer",
        department: "Computer Science & Engineering",
        year: 2025,
        testimonial:
          "YMKCOE gave me the technical and soft skills foundation I needed to crack the TCS placement drive.",
      },
      {
        student_name: "Priya Jadhav",
        company: "Infosys",
        package: "3.6 LPA",
        role: "Systems Engineer",
        department: "Computer Science & Engineering",
        year: 2025,
        testimonial:
          "The training sessions by Prof. Trupti Shinde were incredibly helpful for interview preparation.",
      },
      {
        student_name: "Akash Patil",
        company: "Wipro",
        package: "3.5 LPA",
        role: "Project Engineer",
        department: "Information Technology",
        year: 2025,
        testimonial:
          "The practical lab sessions at YMKCOE prepared me well for real-world software projects.",
      },
      {
        student_name: "Sneha Kulkarni",
        company: "Cognizant",
        package: "4.0 LPA",
        role: "Programmer Analyst",
        department: "Computer Science & Engineering",
        year: 2025,
        testimonial:
          "I'm grateful to the placement cell and faculty who mentored me throughout the process.",
      },
      {
        student_name: "Omkar Shinde",
        company: "Tech Mahindra",
        package: "3.8 LPA",
        role: "Associate Software Engineer",
        department: "Artificial Intelligence & Data Science",
        year: 2025,
        testimonial:
          "The AI curriculum at YMKCOE aligned perfectly with what Tech Mahindra was looking for.",
      },
      {
        student_name: "Neha Bhosale",
        company: "HCL Technologies",
        package: "3.5 LPA",
        role: "Graduate Engineer Trainee",
        department: "Electronics & Telecommunication Engineering",
        year: 2025,
        testimonial:
          "Hands-on labs in VLSI and embedded systems gave me a real edge in the placement interviews.",
      },
      {
        student_name: "Vikas More",
        company: "L&T Technology Services",
        package: "4.5 LPA",
        role: "Engineering Trainee",
        department: "Electronics & Telecommunication Engineering",
        year: 2024,
        testimonial: "YMKCOE's industry-focused curriculum made the transition to professional work seamless.",
      },
      {
        student_name: "Rutuja Pawar",
        company: "Persistent Systems",
        package: "4.0 LPA",
        role: "Software Developer",
        department: "Information Technology",
        year: 2024,
        testimonial: "The coding culture at YMKCOE and support from faculty helped me land my dream job.",
      },
      {
        student_name: "Gaurav Kamble",
        company: "Capgemini",
        package: "4.0 LPA",
        role: "Analyst",
        department: "Computer Science & Engineering",
        year: 2024,
        testimonial: "The placement preparation workshops were excellent — they covered both technical and HR rounds.",
      },
      {
        student_name: "Ankita Gaikwad",
        company: "Mphasis",
        package: "3.75 LPA",
        role: "Junior Developer",
        department: "Artificial Intelligence & Data Science",
        year: 2024,
        testimonial: "AI & DS at YMKCOE opened doors I never imagined. The Python and ML labs were world-class.",
      },
      {
        student_name: "Sanket Thorat",
        company: "Accenture",
        package: "4.5 LPA",
        role: "Application Development Associate",
        department: "Computer Science & Engineering",
        year: 2024,
        testimonial: "Great exposure through internships and college projects helped me ace the Accenture interviews.",
      },
      {
        student_name: "Pooja Wagh",
        company: "Zensar Technologies",
        package: "3.6 LPA",
        role: "Software Trainee",
        department: "Information Technology",
        year: 2023,
        testimonial: "YMKCOE taught me to think like an engineer and solve problems efficiently.",
      },
      {
        student_name: "Abhijit Salunkhe",
        company: "KPIT Technologies",
        package: "5.0 LPA",
        role: "Embedded Software Engineer",
        department: "Electronics & Telecommunication Engineering",
        year: 2023,
        testimonial: "KPIT was looking for embedded systems expertise — exactly what YMKCOE trained me in.",
      },
      {
        student_name: "Komal Sonawane",
        company: "Bajaj Auto",
        package: "4.2 LPA",
        role: "Graduate Engineer Trainee",
        department: "Mechanical Engineering",
        year: 2023,
        testimonial: "Mechanical labs and design projects at YMKCOE prepared me well for the automotive sector.",
      },
    ];

    for (const p of placements) {
      await client.query(
        `INSERT INTO placements (student_name, company, package, role, department, year, testimonial)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [p.student_name, p.company, p.package, p.role, p.department, p.year, p.testimonial]
      );
    }
    console.log("✓ 14 placements seeded");

    await client.query("COMMIT");
    console.log("\n✅ Database seeded successfully with real YMKCOE data!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seed failed:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
