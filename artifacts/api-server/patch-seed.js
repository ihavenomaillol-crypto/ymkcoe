import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'seed-real.mjs');
let content = fs.readFileSync(file, 'utf8');

const newFaculty = [
  {
    name: "Mr. Hrishikesh Rajan Chitrakar",
    department: "Basic Sciences & Humanities",
    designation: "Assistant Professor",
    qualification: "MSc, SET (Mathematics)",
    specialization: "Mathematics",
    experience: null,
    is_hod: false,
    bio: "",
    photoUrl: "https://drive.google.com/uc?export=view&id=1PdSTSkzrhZDD3tB4g6hh58EiYZpMmdRp",
  },
  {
    name: "Mr. Pritam Nandakumar Mule",
    department: "Basic Sciences & Humanities",
    designation: "Assistant Professor",
    qualification: "PhD pursuing",
    specialization: "",
    experience: null,
    is_hod: false,
    bio: "",
    photoUrl: "https://drive.google.com/uc?export=view&id=1TgFzyeMcj6Dn2Xs__STR4MmtQUJx0LeR",
  },
  {
    name: "Dr. Chetan Motiram Harak",
    department: "Basic Sciences & Humanities",
    designation: "Assistant Professor",
    qualification: "M.Sc. in Organic Chemistry , Ph.D. in Chemistry",
    specialization: "Organic Chemistry",
    experience: null,
    is_hod: false,
    bio: "",
    photoUrl: "https://drive.google.com/uc?export=view&id=10Ts6TmM0F4UyFOALLY8khAotdmN8ZFFQ",
  },
  {
    name: "Ms. Ahilya Vishnu Narsale",
    department: "Basic Sciences & Humanities",
    designation: "Assistant Professor",
    qualification: "M.Sc B.Ed (Mathematics)",
    specialization: "Mathematics",
    experience: null,
    is_hod: false,
    bio: "",
    photoUrl: "https://drive.google.com/uc?export=view&id=1yJ5B7xVN2DBUmOP8FXCoTKsPuzP7yTaX",
  },
  {
    name: "Prof. Sushama Ganesh Nawale",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor",
    qualification: "Ph.D. Pursuing",
    specialization: "",
    experience: null,
    is_hod: false,
    bio: "",
    photoUrl: "https://drive.google.com/uc?export=view&id=1M61UzPeEFB-zqwVhs1Knu2VJrJ40KE1F",
  },
  {
    name: "Ms. Ghodake Snehal Nitin",
    department: "Basic Sciences & Humanities",
    designation: "Assistant Professor",
    qualification: "MH-SET, M.Sc.",
    specialization: "",
    experience: null,
    is_hod: false,
    bio: "",
    photoUrl: "https://drive.google.com/uc?export=view&id=13SGH_827OYyhLyJCeFc4THE30Fp64yXj",
  },
  {
    name: "Ms. Sheetal Shivaji Hotkar",
    department: "Electronics & Telecommunication Engineering",
    designation: "Assistant Professor",
    qualification: "Ph.D(Pursuing)-Electronics",
    specialization: "Electronics",
    experience: null,
    is_hod: false,
    bio: "",
    photoUrl: "https://drive.google.com/uc?export=view&id=1m_wxh8ctwRz_zeIBSpdGD2fs6nGyWD2N",
  },
  {
    name: "Mrs. Jaheda Nisar Magdum",
    department: "Information Technology",
    designation: "Assistant Professor",
    qualification: "M.E. IT",
    specialization: "IT",
    experience: null,
    is_hod: false,
    bio: "",
    photoUrl: "https://drive.google.com/uc?export=view&id=1Pw0AEtJJLEY7JaiNODRaSqEFXLTiS85Q",
  },
  {
    name: "Prof. Vishal Subhash Chaugule",
    department: "Civil Engineering",
    designation: "Head of Department",
    qualification: "PhD Pursuing",
    specialization: "",
    experience: null,
    is_hod: true,
    bio: "",
    photoUrl: "https://drive.google.com/uc?export=view&id=15ZpCIH8Be2P_Sd_nId_YBmB_bABWxv5T",
  },
  {
    name: "Mr. Akshay Sudam Kate",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor",
    qualification: "M.Tech",
    specialization: "",
    experience: null,
    is_hod: false,
    bio: "",
    photoUrl: "https://drive.google.com/uc?export=view&id=1Nf2pSQYCBtXhpRegKd45f7Us56pzL0MR",
  },
  {
    name: "Prof. Priya Jagannath Chaugule",
    department: "Electronics & Telecommunication Engineering",
    designation: "Assistant Professor",
    qualification: "M.E. E&TC (VLSI & EMBEDDEDSYSTEM)",
    specialization: "VLSI & EMBEDDEDSYSTEM",
    experience: null,
    is_hod: false,
    bio: "",
    photoUrl: "https://drive.google.com/uc?export=view&id=1diGkNy95KF46xEMzNLKbnZGJfE80EYbd"
  },
  {
    name: "Ms. Jagruti Dhananjay Funde",
    department: "Basic Sciences & Humanities",
    designation: "Assistant Professor",
    qualification: "MA English, NET, SET",
    specialization: "English",
    experience: null,
    is_hod: false,
    bio: "",
    photoUrl: "https://drive.google.com/uc?export=view&id=1NbkINRL60uE66TmhfmT5DwZThxHvRHLz"
  },
  {
    name: "Prof. Shraddha Rajesh Jadhao",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor",
    qualification: "M.E. computer",
    specialization: "Computer Science",
    experience: null,
    is_hod: false,
    bio: "",
    photoUrl: "https://drive.google.com/uc?export=view&id=1KyVlxyHniAnO4wc7mHZ5Eq8jXitA0Q1y"
  },
  {
    name: "Mrs. Ketaki Kaustubh Thosar",
    department: "Administration",
    designation: "Accountant",
    qualification: "B.com",
    specialization: "Accounts",
    experience: null,
    is_hod: false,
    bio: "",
    photoUrl: "https://drive.google.com/uc?export=view&id=1uJ9ii_RzlJavYNHMPiCBMaR7qEAt5JHS"
  }
];

const startIdx = content.indexOf('const faculty = [');
const endIdx = content.indexOf('// ── NEWS', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  let before = content.slice(0, startIdx);
  let after = content.slice(endIdx);
  
  const middle = `const faculty = ${JSON.stringify(newFaculty, null, 6)};\n\n    for (const f of faculty) {\n      await client.query(\n        \`INSERT INTO faculty (name, department, designation, qualification, specialization, experience, is_hod, bio, photo_url)\n         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)\`,\n        [f.name, f.department, f.designation, f.qualification, f.specialization, f.experience, f.is_hod, f.bio, f.photoUrl || f.imageSrc]\n      );\n    }\n    console.log("✓ ${newFaculty.length} faculty seeded");\n\n    `;
  
  fs.writeFileSync('./seed-real.mjs', before + middle + after);
  console.log("Replaced faculty data in seed-real.mjs!");
}
