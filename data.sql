--
-- PostgreSQL database dump
--

\restrict plR5vYSmZV5oL2us37drkpnVA2WmjShNshko7cYbzxd2s892jNzGpLkLqfRk9rZ

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.admins (id, username, password_hash, is_admin, created_at) VALUES (4, 'admin', 'de63834da03e118d469c661646ee0d24629930662dfc81109601b6c752282058', true, '2026-07-09 14:33:35.106709');


--
-- Data for Name: admission_leads; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: contact_submissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.courses (id, name, department, type, duration, seats, description, eligibility, fees, image_url, is_active, created_at) VALUES (13, 'Computer Science & Engineering', 'Computer Science & Engineering', 'UG', '4 Years', 120, 'The CSE program at YMK COE is a four-year course that builds a strong foundation in computing, software, and hardware systems. It covers key areas like algorithms, programming, data structures, AI, cybersecurity, and data privacy. The curriculum blends theory with hands-on learning, encouraging innovation, ethical computing, and interdisciplinary collaboration. Students develop critical thinking and problem-solving skills essential for the tech industry.', '10+2 with Physics, Chemistry & Mathematics. Admission through MHT-CET / JEE Main. Choice Code: 1635224210 | TFWS: 1635224211T', 'As per DTE norms. TFWS seats available.', NULL, true, '2026-07-09 14:33:35.106709');
INSERT INTO public.courses (id, name, department, type, duration, seats, description, eligibility, fees, image_url, is_active, created_at) VALUES (14, 'Artificial Intelligence & Data Science', 'Artificial Intelligence & Data Science', 'UG', '4 Years', 120, 'The AI & DS program at YMK COE is designed to train the next generation of data scientists and AI engineers. The curriculum covers machine learning, deep learning, natural language processing, big data analytics, and statistical modelling. Students gain hands-on experience with Python, TensorFlow, and industry tools to solve real-world data challenges.', '10+2 with Physics, Chemistry & Mathematics. Admission through MHT-CET / JEE Main. Choice Code: 1635299510 | TFWS: 1635299511T', 'As per DTE norms. TFWS seats available.', NULL, true, '2026-07-09 14:33:35.106709');
INSERT INTO public.courses (id, name, department, type, duration, seats, description, eligibility, fees, image_url, is_active, created_at) VALUES (15, 'Electronics & Telecommunication Engineering', 'Electronics & Telecommunication Engineering', 'UG', '4 Years', 60, 'The E&TC program at YMK COE is a four-year course that provides in-depth knowledge of electronic systems, communication technologies, and embedded systems. It covers analog and digital communication, signal processing, VLSI design, IoT, and wireless technologies. The curriculum integrates theoretical learning with hands-on experience through well-equipped labs and industry-driven projects.', '10+2 with Physics, Chemistry & Mathematics. Admission through MHT-CET / JEE Main. Choice Code: 1635237210 | TFWS: 1635237211T', 'As per DTE norms. TFWS seats available.', NULL, true, '2026-07-09 14:33:35.106709');
INSERT INTO public.courses (id, name, department, type, duration, seats, description, eligibility, fees, image_url, is_active, created_at) VALUES (16, 'Information Technology', 'Information Technology', 'UG', '4 Years', 60, 'The B.Tech program in IT at YMK COE is a four-year course designed to develop skilled professionals in software development, data management, networking, cybersecurity, and cloud computing. With a strong focus on practical learning through industry-ready labs and projects, students gain hands-on experience with modern tools and technologies.', '10+2 with Physics, Chemistry & Mathematics. Admission through MHT-CET / JEE Main. Choice Code: 1635224610 | TFWS: 1635224611T', 'As per DTE norms. TFWS seats available.', NULL, true, '2026-07-09 14:33:35.106709');


--
-- Data for Name: faculty; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (52, 'Dr. Amruta Vijay Surana', 'Computer Science & Engineering', 'Vice-Principal', 'Ph.D. (Computer Engineering)', 'Computer Engineering', '15', NULL, NULL, '/vice_principal.png', '', true, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (51, 'Prof. Dr. N.G. Narve', 'Mechanical Engineering', 'Principal', 'Ph.D.', 'Mechanical Engineering', NULL, NULL, NULL, NULL, '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (53, 'Mr. Karan Vijay Navgire', 'Library', 'Librarian', '', '', NULL, NULL, NULL, NULL, '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (54, 'Dr. Vishal Mangesh Kamathe', 'Basic Sciences & Humanities', 'Assistant Professor', '', 'Engineering Physics', NULL, NULL, NULL, NULL, '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (55, 'Mr. Vishal Subhash Choughule', 'Civil Engineering', 'Assistant Professor', '', 'Civil Engineering', NULL, NULL, NULL, 'https://drive.google.com/uc?export=view&id=15ZpCIH8Be2P_Sd_nId_YBmB_bABWxv5T', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (56, 'Ms. Trupti Shankar Shinde', 'Basic Sciences & Humanities', 'Assistant Professor', 'B.B.A, MBA & TPO Ph.D. Pursuing', 'Management', NULL, NULL, NULL, NULL, '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (57, 'Mr. Hrishikesh Rajan Chitrakar', 'Basic Sciences & Humanities', 'Assistant Professor', 'MSc, SET (Mathematics)', 'Mathematics', NULL, NULL, NULL, '/faculty/H.R._Chitarkar.jpeg', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (58, 'Mr. Pritam Nandakumar Mule', 'Basic Sciences & Humanities', 'Assistant Professor', 'PhD pursuing', '', NULL, NULL, NULL, 'https://drive.google.com/uc?export=view&id=1TgFzyeMcj6Dn2Xs__STR4MmtQUJx0LeR', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (59, 'Dr. Chetan Motiram Harak', 'Basic Sciences & Humanities', 'Assistant Professor', 'M.Sc. in Organic Chemistry , Ph.D. in Chemistry', 'Organic Chemistry', NULL, NULL, NULL, 'https://drive.google.com/uc?export=view&id=10Ts6TmM0F4UyFOALLY8khAotdmN8ZFFQ', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (60, 'Ms. Ahilya Vishnu Narsale', 'Basic Sciences & Humanities', 'Assistant Professor', 'M.Sc B.Ed (Mathematics)', 'Mathematics', NULL, NULL, NULL, 'https://drive.google.com/uc?export=view&id=1yJ5B7xVN2DBUmOP8FXCoTKsPuzP7yTaX', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (61, 'Prof. Sushama Ganesh Nawale', 'Computer Science & Engineering', 'Assistant Professor', 'Ph.D. Pursuing', '', NULL, NULL, NULL, 'https://drive.google.com/uc?export=view&id=1M61UzPeEFB-zqwVhs1Knu2VJrJ40KE1F', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (62, 'Ms. Ghodake Snehal Nitin', 'Basic Sciences & Humanities', 'Assistant Professor', 'MH-SET, M.Sc.', '', NULL, NULL, NULL, '/faculty/Snehal_Ghodake.jpeg', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (63, 'Ms. Sheetal Shivaji Hotkar', 'Electronics & Telecommunication Engineering', 'Assistant Professor', 'Ph.D(Pursuing)-Electronics', 'Electronics', NULL, NULL, NULL, 'https://drive.google.com/uc?export=view&id=1m_wxh8ctwRz_zeIBSpdGD2fs6nGyWD2N', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (64, 'Mrs. Jaheda Nisar Magdum', 'Information Technology', 'Assistant Professor', 'M.E. IT', 'IT', NULL, NULL, NULL, '/faculty/Jaheda_Magdum.jpeg', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (65, 'Mr. Akshay Sudam Kate', 'Mechanical Engineering', 'Assistant Professor', 'M.Tech', '', NULL, NULL, NULL, '/faculty/Akshay_Kate.jpeg', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (66, 'Prof. Priya Jagannath Chougule', 'Electronics & Telecommunication Engineering', 'Assistant Professor', 'M.E. E&TC (VLSI & EMBEDDEDSYSTEM)', 'VLSI & EMBEDDEDSYSTEM', NULL, NULL, NULL, '/faculty/Priya.jpeg', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (67, 'Ms. Jagruti Dhananjay Funde', 'Basic Sciences & Humanities', 'Assistant Professor', 'MA English, NET, SET', 'English', NULL, NULL, NULL, '/faculty/jagruti_funde.jpeg', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (68, 'Prof. Shraddha Rajesh Jadhao', 'Artificial Intelligence and Data Science', 'Assistant Professor', 'M.E. computer', 'Computer Science', NULL, NULL, NULL, '/faculty/Shraddha_Jadhav.jpeg', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (69, 'Mrs. Ketaki Kaustubh Thosar', 'Administration', 'Accountant', 'B.com', 'Accounts', NULL, NULL, NULL, 'https://drive.google.com/uc?export=view&id=1uJ9ii_RzlJavYNHMPiCBMaR7qEAt5JHS', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (70, 'Mr. Amey Pradeep Inamdar', 'Artificial Intelligence and Data Science', 'Assistant Professor', 'BCom, MCA, MBA', 'Information Technology', '19', NULL, NULL, '/faculty/Amey_Pradeep.jpeg', '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (71, 'Ms. Pranali Prakash Agle', 'Information Technology', 'Assistant Professor', 'B.E Information Technology Engineering', 'IT', '1', NULL, NULL, NULL, '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.faculty (id, name, department, designation, qualification, specialization, experience, email, phone, photo_url, bio, is_hod, created_at, title, research_guide_status, admin_roles, core_skills, publications, professional_memberships) VALUES (72, 'Ms. Ashwini Navnath Dhundkar', 'Basic Sciences & Humanities', 'Assistant Professor', 'B.E in Artificial Intelligence And Data Science', 'Computer', NULL, NULL, NULL, NULL, '', false, '2026-07-09 14:33:35.106709', NULL, NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.media (id, title, type, url, thumbnail_url, category, created_at) VALUES (2, 'demo', 'image', '/api/uploads/1782747862732-992739321.png', '', 'campus', '2026-06-29 21:14:22.808905');


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.news (id, title, content, category, image_url, published_at, is_pinned, created_at, status) VALUES (33, 'Admissions Open for B.Tech 2026-27', 'Yashoda Mahadeo Kakade College of Engineering invites applications for B.Tech admissions for the academic year 2026-27. Programs available: Computer Science & Engineering (120 seats), Artificial Intelligence & Data Science (120 seats), Electronics & Telecommunication Engineering (60 seats), and Information Technology (60 seats). Affiliated to Dr. Babasaheb Ambedkar Technological University, AICTE Approved. Apply online at indrayaniedu.in/home/admission/ymk_coe', 'announcement', NULL, '2026-05-01 05:30:00', true, '2026-07-09 14:33:35.106709', 'moderate');
INSERT INTO public.news (id, title, content, category, image_url, published_at, is_pinned, created_at, status) VALUES (34, 'Job Fair 2026 Successfully Conducted at YMKCOE', 'A Job Fair was successfully conducted at Yashoda Mahadeo Kakade College of Engineering on 26th March 2026, aimed at facilitating job opportunities for students from YMKCOE and nearby institutions under Indrayani Vidya Mandir. The event served as a valuable platform connecting aspiring candidates with prospective employers. The fair witnessed enthusiastic participation from students across multiple disciplines, with several companies offering on-the-spot interviews and placement opportunities. Hon. MP Shrirang Barne graced the event and encouraged youth to explore self-employment and entrepreneurship.', 'event', NULL, '2026-03-26 05:30:00', true, '2026-07-09 14:33:35.106709', 'moderate');
INSERT INTO public.news (id, title, content, category, image_url, published_at, is_pinned, created_at, status) VALUES (35, 'Final Merit List 2025-26 Published', 'The final merit list for B.Tech admissions for the academic year 2025-26 has been published. Candidates are requested to download the merit list from the college website and report for document verification as per the schedule. For details regarding vacant seats, refer to the Admission Schedule & Vacant Seats document available on the college website.', 'announcement', NULL, '2025-10-15 05:30:00', false, '2026-07-09 14:33:35.106709', 'moderate');
INSERT INTO public.news (id, title, content, category, image_url, published_at, is_pinned, created_at, status) VALUES (36, 'Institution Innovation Cell Activities 2024-25', 'The Institution Innovation Cell (IIC) at YMKCOE successfully conducted several workshops, hackathons, and innovation boot camps during 2024-25. Students from all departments participated in design thinking sessions, prototype development, and startup ideation workshops. The IIC aims to foster a culture of innovation and entrepreneurship among students.', 'achievement', NULL, '2025-04-10 05:30:00', false, '2026-07-09 14:33:35.106709', 'moderate');
INSERT INTO public.news (id, title, content, category, image_url, published_at, is_pinned, created_at, status) VALUES (37, 'MoU Signed with Industry Partners for Skill Development', 'Yashoda Mahadeo Kakade College of Engineering has signed Memoranda of Understanding (MoU) with leading industry partners to enhance skill development opportunities for students. These collaborations include internship programs, guest lectures by industry experts, and access to cutting-edge tools and technologies.', 'news', NULL, '2025-03-01 05:30:00', false, '2026-07-09 14:33:35.106709', 'moderate');
INSERT INTO public.news (id, title, content, category, image_url, published_at, is_pinned, created_at, status) VALUES (38, 'YMKCOE Students Excel in University Examinations', 'Students of Yashoda Mahadeo Kakade College of Engineering have performed exceptionally well in the Dr. Babasaheb Ambedkar Technological University examinations. Several students have secured distinction and first-class results across all four B.Tech programs. The college congratulates the achievers and thanks the dedicated faculty for their guidance.', 'achievement', NULL, '2025-01-20 05:30:00', false, '2026-07-09 14:33:35.106709', 'moderate');
INSERT INTO public.news (id, title, content, category, image_url, published_at, is_pinned, created_at, status) VALUES (39, 'Girls'' Hostel Facilities Upgraded for 2025-26', 'The management of Indrayani Vidya Mandir is pleased to announce major upgrades to the Girls'' Hostel facilities at YMKCOE campus, Talegaon Dabhade. New amenities include 24/7 Wi-Fi, improved mess facilities, CCTV surveillance, and dedicated study rooms. Applications for hostel accommodation for the academic year 2025-26 are now open.', 'announcement', NULL, '2024-11-05 05:30:00', false, '2026-07-09 14:33:35.106709', 'moderate');


--
-- Data for Name: placements; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.placements (id, student_name, company, package, role, department, year, logo_url, testimonial, created_at) VALUES (43, 'Rahul Deshmukh', 'TCS', '3.5 LPA', 'Systems Engineer', 'Computer Science & Engineering', 2025, NULL, 'YMKCOE gave me the technical and soft skills foundation I needed to crack the TCS placement drive.', '2026-07-09 14:33:35.106709');
INSERT INTO public.placements (id, student_name, company, package, role, department, year, logo_url, testimonial, created_at) VALUES (44, 'Priya Jadhav', 'Infosys', '3.6 LPA', 'Systems Engineer', 'Computer Science & Engineering', 2025, NULL, 'The training sessions by Prof. Trupti Shinde were incredibly helpful for interview preparation.', '2026-07-09 14:33:35.106709');
INSERT INTO public.placements (id, student_name, company, package, role, department, year, logo_url, testimonial, created_at) VALUES (45, 'Akash Patil', 'Wipro', '3.5 LPA', 'Project Engineer', 'Information Technology', 2025, NULL, 'The practical lab sessions at YMKCOE prepared me well for real-world software projects.', '2026-07-09 14:33:35.106709');
INSERT INTO public.placements (id, student_name, company, package, role, department, year, logo_url, testimonial, created_at) VALUES (46, 'Sneha Kulkarni', 'Cognizant', '4.0 LPA', 'Programmer Analyst', 'Computer Science & Engineering', 2025, NULL, 'I''m grateful to the placement cell and faculty who mentored me throughout the process.', '2026-07-09 14:33:35.106709');
INSERT INTO public.placements (id, student_name, company, package, role, department, year, logo_url, testimonial, created_at) VALUES (47, 'Omkar Shinde', 'Tech Mahindra', '3.8 LPA', 'Associate Software Engineer', 'Artificial Intelligence & Data Science', 2025, NULL, 'The AI curriculum at YMKCOE aligned perfectly with what Tech Mahindra was looking for.', '2026-07-09 14:33:35.106709');
INSERT INTO public.placements (id, student_name, company, package, role, department, year, logo_url, testimonial, created_at) VALUES (48, 'Neha Bhosale', 'HCL Technologies', '3.5 LPA', 'Graduate Engineer Trainee', 'Electronics & Telecommunication Engineering', 2025, NULL, 'Hands-on labs in VLSI and embedded systems gave me a real edge in the placement interviews.', '2026-07-09 14:33:35.106709');
INSERT INTO public.placements (id, student_name, company, package, role, department, year, logo_url, testimonial, created_at) VALUES (49, 'Vikas More', 'L&T Technology Services', '4.5 LPA', 'Engineering Trainee', 'Electronics & Telecommunication Engineering', 2024, NULL, 'YMKCOE''s industry-focused curriculum made the transition to professional work seamless.', '2026-07-09 14:33:35.106709');
INSERT INTO public.placements (id, student_name, company, package, role, department, year, logo_url, testimonial, created_at) VALUES (50, 'Rutuja Pawar', 'Persistent Systems', '4.0 LPA', 'Software Developer', 'Information Technology', 2024, NULL, 'The coding culture at YMKCOE and support from faculty helped me land my dream job.', '2026-07-09 14:33:35.106709');
INSERT INTO public.placements (id, student_name, company, package, role, department, year, logo_url, testimonial, created_at) VALUES (51, 'Gaurav Kamble', 'Capgemini', '4.0 LPA', 'Analyst', 'Computer Science & Engineering', 2024, NULL, 'The placement preparation workshops were excellent — they covered both technical and HR rounds.', '2026-07-09 14:33:35.106709');
INSERT INTO public.placements (id, student_name, company, package, role, department, year, logo_url, testimonial, created_at) VALUES (52, 'Ankita Gaikwad', 'Mphasis', '3.75 LPA', 'Junior Developer', 'Artificial Intelligence & Data Science', 2024, NULL, 'AI & DS at YMKCOE opened doors I never imagined. The Python and ML labs were world-class.', '2026-07-09 14:33:35.106709');
INSERT INTO public.placements (id, student_name, company, package, role, department, year, logo_url, testimonial, created_at) VALUES (53, 'Sanket Thorat', 'Accenture', '4.5 LPA', 'Application Development Associate', 'Computer Science & Engineering', 2024, NULL, 'Great exposure through internships and college projects helped me ace the Accenture interviews.', '2026-07-09 14:33:35.106709');
INSERT INTO public.placements (id, student_name, company, package, role, department, year, logo_url, testimonial, created_at) VALUES (54, 'Pooja Wagh', 'Zensar Technologies', '3.6 LPA', 'Software Trainee', 'Information Technology', 2023, NULL, 'YMKCOE taught me to think like an engineer and solve problems efficiently.', '2026-07-09 14:33:35.106709');
INSERT INTO public.placements (id, student_name, company, package, role, department, year, logo_url, testimonial, created_at) VALUES (55, 'Abhijit Salunkhe', 'KPIT Technologies', '5.0 LPA', 'Embedded Software Engineer', 'Electronics & Telecommunication Engineering', 2023, NULL, 'KPIT was looking for embedded systems expertise — exactly what YMKCOE trained me in.', '2026-07-09 14:33:35.106709');
INSERT INTO public.placements (id, student_name, company, package, role, department, year, logo_url, testimonial, created_at) VALUES (56, 'Komal Sonawane', 'Bajaj Auto', '4.2 LPA', 'Graduate Engineer Trainee', 'Mechanical Engineering', 2023, NULL, 'Mechanical labs and design projects at YMKCOE prepared me well for the automotive sector.', '2026-07-09 14:33:35.106709');


--
-- Name: admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_id_seq', 4, true);


--
-- Name: admission_leads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admission_leads_id_seq', 1, false);


--
-- Name: contact_submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_submissions_id_seq', 1, false);


--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courses_id_seq', 16, true);


--
-- Name: faculty_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faculty_id_seq', 74, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.media_id_seq', 2, true);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 39, true);


--
-- Name: placements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.placements_id_seq', 56, true);


--
-- PostgreSQL database dump complete
--

\unrestrict plR5vYSmZV5oL2us37drkpnVA2WmjShNshko7cYbzxd2s892jNzGpLkLqfRk9rZ

