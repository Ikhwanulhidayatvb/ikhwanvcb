import React, { useRef, useState } from 'react'
import { useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FaInstagram } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { FadeUp, FadeLeft } from "./components/animations"
import ikhwan from './assets/ikhwan.jpg'
import budikecil from "./assets/budikecil.png"
import budikecil2 from "./assets/budikecil2.png"
import { MusicPlayer } from "./components/MusicPlayer"
import { Reveal } from "./components/Reveal"
import { Gallery } from "./components/Gallery"


const galleryData = {
  internship: [
    { id: 1, type: "image", src: "images/magang2.jpeg" },
    { id: 2, type: "image", src: "images/magang1.jpeg" },
    { id: 3, type: "video", src: "videos/magang3.mp4" },
    { id: 4, type: "image", src: "images/magang4.jpeg" },
  ],

  work: [
    { id: 5, type: "image", src: "images/icn1.jpeg" },
    { id: 6, type: "video", src: "videos/icn3.mp4" },
    { id: 7, type: "video", src: "videos/icn5.mp4" },
    { id: 8, type: "video", src: "videos/icn7.mp4" },
    { id: 9, type: "image", src: "images/project1.jpeg" },
    { id: 10, type: "image", src: "images/project2.png" },
    { id: 11, type: "image", src: "images/project3.png" },

  ],

  random: [
    { id: 12, type: "image", src: "images/personal1.jpeg" },
    { id: 13, type: "video", src: "videos/personal5.mp4" },
    { id: 14, type: "image", src: "images/personal6.jpeg" },
    { id: 15, type: "image", src: "images/personal7.jpeg" },
    { id: 16, type: "image", src: "images/teman1.jpeg" },
    { id: 17, type: "image", src: "images/teman2.jpeg" },
    { id: 18, type: "image", src: "images/teman3.jpeg" },
    { id: 19, type: "image", src: "images/teman4.jpeg" },
    { id: 20, type: "image", src: "images/teman5.jpeg" },
    { id: 21, type: "image", src: "images/kampus1.jpeg" },
    { id: 22, type: "image", src: "images/teman6.jpeg" },

  ],
}

const translations = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      skills: "Skills",
      about: "About",
      contact: "Contact",
      hire: "Hire me",
    },
    hero: {
      desc: `Informatics Engineering graduate specializing in Fullstack Web Development with hands on experience building scalable web applications using Laravel and React. Proven ability to design RESTful APIs, manage MySQL databases, and deliver responsive, user focused systems from concept to deployment. Experienced in WiFi network installation and troubleshooting, ensuring reliable and secure connectivity. This combination of software and networking expertise enables a broader understanding of system architecture and performance. Strong analytical mindset, problem solving skills, and adaptability in both independent and team environments. Highly motivated to continuously learn and stay up to date with modern technologies and industry best practices`
    },
    projects: {
      title: "My Projects & Experiences",
      subtitle: "Here are the areas I focus on web development, creative content, and networking.",
      web: "Web Development",
      network: "Networking",
      content: "Content Creator",
      editing: "Editing & Design",
      editingDesc: "Experienced in using Adobe Premiere Pro, Photoshop, and CapCut for video editing and visual design.",
      live: "Live Streaming",
      liveDesc: "Experienced in live streaming setup using OBS & TikTok Studio, including audio and broadcast production.",

      riau: {
        title: "Riau Berbagi",
        items: [
          "Technologies: Laravel, React, PHP, JavaScript, MySQL",
          "Developed an end to end web-based donation system",
          "Built RESTful APIs for frontend and backend communication",
          "Implemented CRUD features for data management",
          "Designed and managed database structure using MySQL",
          "Developed guest donation feature (no login required)",
          "Improved user experience with responsive and user friendly design",
          "Implemented Progressive Web App (PWA) concept",
          "Maintained clean, structured, and scalable code",
          "Managed version control using Git"
        ]
      },

      ptpn: {
        title: "Monitoring Contract Workflows at PTPN IV Regional III (Internship)",
        items: [
          "Developed a web-based contract monitoring system",
          "Implemented automatic notifications for expiring contracts",
          "Assisted in web-based data management",
          "Collaborated to improve system efficiency"
        ]
      },

      icn: {
        title: "ICN",
        items: [
          "Installed and configured WiFi networks for customers",
          "Ensured stable and secure connections",
          "Performed network troubleshooting",
          "Provided technical support to users"
        ]
      },

      sumix: {
        title: "SUMIX",
        items: [
          "Assisted in network installation and maintenance",
          "Performed troubleshooting",
          "Supported field technicians",
          "Performing WiFi network repairs",
          "Configuring routers and other network devices",
          "Microtik"
        ]
      }
    },
    skills: {
      title: "Skills",
      subtitle: "Technologies and tools I work with",
      web: "Web Development",
      content: "Content Creator",
      network: "Networking"
    },
    about: {
      title: "About Me",
      subtitle: "Who I am and what I can offer",
      desc1: "I am Ikhwan, a Computer Science graduate and Full Stack Developer specializing in building scalable and high performance web applications using React and Laravel. I have experience in designing RESTful APIs, managing databases, and delivering responsive, user focused systems from concept to deployment. I also have hands on experience in networking and IT infrastructure, including installation and troubleshooting. This combined expertise allows me to develop reliable, efficient, and well integrated systems across both software and operational environments..",
      why: "Why Hire Me?"
    },
    contact: {
      title: "Contact",
      subtitle: "Let’s connect through my socials",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      social: "Social Media"
    },
    portfolio: {
      title: "Creative Portfolio",
      subtitle: "Music, Gallery, Video & Interactive Projects"
    },
    points: [
      "Strong experience in React, Laravel, and MySQL",
      "Solid understanding of networking and system deployment",
      "Focus on performance, scalability, and user experience",
      "Able to work effectively both independently and in a team environment",
      "Fast learner with strong adaptability to new technologies"
    ]

  },

  id: {
    nav: {
      home: "Beranda",
      projects: "Proyek",
      skills: "Keahlian",
      about: "Tentang",
      contact: "Kontak",
      hire: "Rekrut Saya",
    },
    hero: {
      desc: `Lulusan Teknik Informatika yang berfokus pada Fullstack Web Development dengan pengalaman membangun aplikasi web menggunakan Laravel dan React. Memiliki kemampuan dalam merancang RESTful API, mengelola database MySQL, serta membuat sistem yang responsif dan berorientasi pada pengguna dari tahap konsep hingga deployment. Berpengalaman dalam instalasi dan troubleshooting jaringan WiFi untuk memastikan koneksi yang stabil dan aman. Kombinasi keahlian software dan networking ini memberikan pemahaman yang lebih luas terhadap arsitektur sistem dan performa. Memiliki pola pikir analitis, kemampuan problem solving, serta adaptif baik secara individu maupun dalam tim. Memiliki motivasi tinggi untuk terus belajar dan mengikuti perkembangan teknologi terbaru serta praktik terbaik industri`
    },
    projects: {
      title: "Proyek & Pengalaman",
      subtitle: "Berikut adalah bidang yang saya fokuskan pada web development, konten kreatif, dan networking.",
      web: "Pengembangan Web",
      network: "Jaringan",
      content: "Content Creator",
      editing: "Editing & Desain",
      editingDesc: "Berpengalaman menggunakan Adobe Premiere Pro, Photoshop, dan CapCut untuk editing video dan desain visual.",
      live: "Live Streaming",
      liveDesc: "Berpengalaman dalam setup live streaming menggunakan OBS & TikTok Studio, termasuk audio dan produksi siaran.",

      riau: {
        title: "Riau Berbagi",
        items: [
          "Teknologi: Laravel, React, PHP, JavaScript, MySQL",
          "Mengembangkan sistem donasi berbasis web secara end to end",
          "Membangun RESTful API untuk komunikasi frontend dan backend",
          "Mengimplementasikan fitur CRUD untuk manajemen data",
          "Merancang dan mengelola struktur database menggunakan MySQL",
          "Mengembangkan fitur donasi tanpa login (guest)",
          "Meningkatkan pengalaman pengguna dengan desain responsif dan user friendly",
          "Mengimplementasikan konsep Progressive Web App (PWA)",
          "Menjaga kode tetap bersih, terstruktur, dan scalable",
          "Mengelola version control menggunakan Git"
        ]
      },

      ptpn: {
        title: "Monitoring Kontrak di PTPN IV Regional III (Magang)",
        items: [
          "Mengembangkan sistem monitoring kontrak berbasis web",
          "Mengimplementasikan notifikasi otomatis untuk kontrak yang akan habis",
          "Membantu pengelolaan data berbasis web",
          "Berkolaborasi untuk meningkatkan efisiensi sistem"
        ]
      },

      icn: {
        title: "ICN",
        items: [
          "Melakukan instalasi dan konfigurasi jaringan WiFi untuk pelanggan",
          "Memastikan koneksi stabil dan aman",
          "Melakukan troubleshooting jaringan",
          "Memberikan dukungan teknis kepada pengguna"
        ]
      },

      sumix: {
        title: "SUMIX",
        items: [
          "Membantu instalasi dan pemeliharaan jaringan",
          "Melakukan troubleshooting",
          "Mendukung teknisi lapangan",
          "Melakukan perbaikan jaringan WiFi",
          "Melakukan konfigurasi router dan perangkat jaringan lainnya",
          "Mikrotik"

        ]
      }
    },
    skills: {
      title: "Keahlian",
      subtitle: "Teknologi dan tools yang saya gunakan",
      web: "Pengembangan Web",
      content: "Content Creator",
      network: "Jaringan"
    },
    about: {
      title: "Tentang Saya",
      subtitle: "Siapa saya dan apa yang bisa saya berikan",
      desc1: "Saya adalah Ikhwan, lulusan Teknik Informatika dan Full Stack Developer yang berfokus pada pengembangan aplikasi web yang scalable dan high performance menggunakan React dan Laravel. Saya juga memiliki pengalaman dalam networking dan infrastruktur IT, termasuk instalasi dan troubleshooting.",
      why: "Kenapa Memilih Saya?"
    },
    contact: {
      title: "Kontak",
      subtitle: "Mari terhubung melalui sosial media saya",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      social: "Media Sosial"
    },
    portfolio: {
      title: "Portofolio Kreatif",
      subtitle: "Musik, Galeri, Video & Proyek Interaktif"
    },
    points: [
      "Berpengalaman dalam React, Laravel, dan MySQL",
      "Memahami networking dan deployment sistem",
      "Fokus pada performa, skalabilitas, dan pengalaman pengguna",
      "Mampu bekerja secara individu maupun dalam tim",
      "Cepat belajar dan mudah beradaptasi dengan teknologi baru"
    ]
  }
}

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>
    {children}
  </div>
)

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-1 rounded-full 
    border border-gray-200 dark:border-white/10 
    bg-gray-100 dark:bg-white/5 
    px-3 py-1 text-xs 
    text-gray-700 dark:text-white/80 
    shadow-soft">
    {children}
  </span>
)

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-10 text-center">
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
      <span className="text-gradient">{title}</span>
    </h2>

    {subtitle && (
      <p className="mt-3 text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
)

const Navbar = ({ lang, setLang, theme, setTheme, time }) => {
  const [open, setOpen] = useState(false)
  const t = translations[lang]

  const links = [
    { href: "#home", label: t.nav.home },
    { href: "#projects", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur 
      bg-white/80 dark:bg-slate-900/70 
      border-b border-gray-200 dark:border-white/10">

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <a href="#home" className="flex items-center gap-3">
          <img
            src="/logoih.png"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover 
              border border-gray-300 dark:border-white/20"
          />
          <span className="font-bold tracking-tight text-gray-900 dark:text-white">
            Ikhwanul Hidayat
          </span>
        </a>

        {/* MENU DESKTOP */}
        <ul className="hidden md:flex items-center gap-6 text-sm 
          text-gray-700 dark:text-white/70">
          {links.map(l => (
            <li key={l.href}>
              <motion.a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.querySelector(l.href)
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="hover:text-black dark:hover:text-white transition"
              >
                {l.label}
              </motion.a>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">

          {/* JAM */}
          <span className="text-sm text-gray-600 dark:text-white/70">
            {time}
          </span>

          {/* LANGUAGE */}
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 rounded transition 
                ${lang === "en"
                  ? "bg-gray-300 dark:bg-white/20 text-black dark:text-white"
                  : "text-gray-600 dark:text-white/70"
                }`}
            >
              EN
            </button>

            <button
              onClick={() => setLang("id")}
              className={`px-2 py-1 rounded transition 
                ${lang === "id"
                  ? "bg-gray-300 dark:bg-white/20 text-black dark:text-white"
                  : "text-gray-600 dark:text-white/70"
                }`}
            >
              ID
            </button>
          </div>

          {/* THEME TOGGLE */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-1 rounded 
              bg-gray-200 dark:bg-slate-700 
              text-gray-800 dark:text-white 
              text-sm transition"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-xl 
            border border-gray-300 dark:border-white/10 
            px-3 py-2 
            text-gray-700 dark:text-white/80"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <motion.div
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="md:hidden border-t 
            border-gray-200 dark:border-white/10 
            bg-white dark:bg-slate-900"
        >
          <ul className="max-w-6xl mx-auto px-4 sm:px-6 py-3 
            text-gray-800 dark:text-white/90">

            {links.map(l => (
              <li key={l.href}>
                <motion.a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.querySelector(l.href)
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="hover:text-black dark:hover:text-white transition"
                >
                  {l.label}
                </motion.a>
              </li>
            ))}

            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-block w-full text-center rounded-xl 
                  border border-gray-300 dark:border-white/10 
                  bg-gray-200 dark:bg-primary-600/20 
                  text-gray-800 dark:text-white
                  px-4 py-2"
              >
                {t.nav.hire}
              </a>
            </li>

            {/* MOBILE EXTRA */}
            <li className="pt-4 flex justify-between items-center text-gray-700 dark:text-white/80">
              <span>{time}</span>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="px-3 py-1 rounded 
                  bg-gray-200 dark:bg-slate-700 
                  text-gray-800 dark:text-white text-sm"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
            </li>

          </ul>
        </motion.div>
      )}
    </nav>
  )
}
const Hero = ({ lang }) => {
  const t = translations[lang]
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <section id="home" ref={ref} className="relative overflow-hidden isolate">


      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 -z-10 opacity-40" />

      <Container className="py-24 md:py-40">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* teks kiri */}
          <div>
            <FadeUp delay={0.2}>
              <Badge>laravel • react • Networking • IT Infrastructure • video & photo</Badge>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="mt-5 max-w-xl text-justify text-gray-700 dark:text-white/70">
                {t.hero.desc}
              </p>
            </FadeUp>
          </div>

          {/* foto kanan */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img
              src={ikhwan}
              alt="Wanoy"
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-primary-600 shadow-soft"
            />
          </motion.div>

        </div>
      </Container>
    </section>
  )
}

const Projects = ({ lang }) => {
  const t = translations[lang];

  const cardStyle = "rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[.03] p-6 shadow-soft"

  return (
    <section id="projects" className="relative py-24 isolate overflow-hidden">
      <Container>

        <SectionTitle
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />
        <div className="space-y-16">
          {/* Web */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gradient">
              {t.projects.web}
            </h3>
            <div className="grid gap-6 md:grid-cols-2">

              <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-primary-600/10 to-emerald-500/10 p-1 h-full">
                <div className="rounded-[20px] bg-white dark:bg-slate-900/70 p-6 h-full flex flex-col overflow-hidden">
                  <FadeUp delay={0.2}>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t.projects.riau.title}
                    </h4>
                  </FadeUp>
                  <FadeLeft delay={0.2}>
                    <ul className="mt-2 text-gray-600 dark:text-white/70 text-sm list-disc pl-5">
                      {t.projects.riau.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </FadeLeft>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-primary-600/10 to-emerald-500/10 p-1 h-full">
                <div className="rounded-[20px] bg-white dark:bg-slate-900/70 p-6 h-full flex flex-col overflow-hidden">
                  <FadeUp delay={0.2}>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t.projects.ptpn.title}
                    </h4>
                  </FadeUp>
                  <FadeLeft delay={0.2}>
                    <ul className="mt-2 text-gray-600 dark:text-white/70 text-sm list-disc pl-5">
                      {t.projects.ptpn.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </FadeLeft>
                </div>
              </div>
            </div>
          </div>

          {/* Networking */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gradient">
              {t.projects.network}
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-primary-600/10 to-emerald-500/10 p-1 h-full">
                <div className="rounded-[20px] bg-white dark:bg-slate-900/70 p-6 h-full flex flex-col overflow-hidden">

                  <FadeUp delay={0.2}>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t.projects.icn.title}
                    </h4>
                  </FadeUp>
                  <FadeLeft delay={0.2}>
                    <ul className="mt-2 text-gray-600 dark:text-white/70 text-sm list-disc pl-5">
                      {t.projects.icn.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </FadeLeft>
                </div>
              </div>
              <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-primary-600/10 to-emerald-500/10 p-1">
                <div className="rounded-[20px] bg-white dark:bg-slate-900/70 p-6">
                  <FadeUp delay={0.2}>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t.projects.sumix.title}
                    </h4>
                  </FadeUp>
                  <FadeLeft delay={0.2}>
                    <ul className="mt-2 text-gray-600 dark:text-white/70 text-sm list-disc pl-5">
                      {t.projects.sumix.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </FadeLeft>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gradient">
              {t.projects.content}
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-primary-600/10 to-emerald-500/10 p-1">
                <div className="rounded-[20px] bg-white dark:bg-slate-900/70 p-6">
                  <FadeUp delay={0.2}>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t.projects.editing}
                    </h4>
                  </FadeUp>
                  <FadeLeft delay={0.2}>
                    <p className="mt-2 text-gray-600 dark:text-white/70 text-sm">
                      {t.projects.editingDesc}
                    </p>
                  </FadeLeft>
                </div>
              </div>
              <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-primary-600/10 to-emerald-500/10 p-1">
                <div className="rounded-[20px] bg-white dark:bg-slate-900/70 p-6">
                  <FadeUp delay={0.2}>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t.projects.live}
                    </h4>
                  </FadeUp>
                  <FadeLeft delay={0.2}>
                    <p className="mt-2 text-gray-600 dark:text-white/70 text-sm">
                      {t.projects.liveDesc}
                    </p>
                  </FadeLeft>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
const Skills = ({ lang }) => {
  const t = translations[lang];

  const chipStyle =
    "rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[.05] px-4 py-2 shadow-sm dark:shadow-soft text-gray-800 dark:text-white/80 hover:scale-105 transition"

  return (
    <section
      id="skills"
      className="relative py-24 border-y border-gray-200 dark:border-white/5 bg-white dark:bg-slate-900 isolate overflow-hidden"
    >
      <Container>
        <SectionTitle title={t.skills.title} subtitle={t.skills.subtitle} />

        <div className="space-y-12">

          {/* Web */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gradient">
              {t.skills.web}
            </h3>
            <div className="flex gap-4 flex-wrap">
              {["React", "TailwindCSS", "Framer Motion", "Laravel", "Inertia", "MySQL", "PHP", "Git"].map((s, i) => (

                <FadeLeft key={s} delay={i * 0.1}>
                  <div className={chipStyle}>
                    {s}
                  </div>
                </FadeLeft>
              ))}
            </div>
          </div>

          {/* Networking */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gradient">
              {t.skills.network}
            </h3>
            <div className="flex gap-4 flex-wrap">
              {["WiFi Installation", "Network Troubleshooting", "LAN/WAN Setup", "Router Configuration", "Iconnet Field Experience"].map((s, i) => (
                <FadeLeft key={s} delay={i * 0.1}>
                  <div className={chipStyle}>
                    {s}
                  </div>
                </FadeLeft>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gradient">
              {t.skills.content}
            </h3>
            <div className="flex gap-4 flex-wrap">
              {["Adobe Premiere Pro", "Adobe Photoshop", "CapCut", "OBS Studio", "TikTok Live"].map((s, i) => (
                <FadeLeft key={s} delay={i * 0.1}>
                  <div className={chipStyle}>
                    {s}
                  </div>
                </FadeLeft>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}

const About = ({ lang }) => {
  const t = translations[lang];
  return (
    <section id="about" className="relative py-24 isolate overflow-hidden">
      <Container>
        <SectionTitle title={t.about.title} subtitle={t.about.subtitle} />

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* LEFT CARD */}
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-primary-600/10 to-emerald-500/10 p-1">
            <div className="rounded-[20px] bg-white dark:bg-slate-900/70 p-6">
              <h3 className="text-lg font-semibold mb-3 text-gradient">
                Full Stack Developer & IT Enthusiast
              </h3>
              <FadeLeft delay={0.1}>
                <p className="text-gray-700 dark:text-white/80 text-justify leading-relaxed">
                  {t.about.desc1}
                </p>
              </FadeLeft>
            </div>
          </div>
          {/* RIGHT CARD */}
          <FadeUp>
            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-primary-600/10 to-emerald-500/10 p-1">

              <div className="rounded-[20px] bg-white dark:bg-slate-900/70 p-6">

                <h3 className="text-lg font-semibold mb-4 text-gradient">
                  {t.about.why}
                </h3>

                <ul className="space-y-2 text-gray-700 dark:text-white/80 list-disc pl-5">
                  {t.points.map((p, i) => (
                    <FadeLeft key={i} delay={i * 0.1}>
                      <li>{p}</li>
                    </FadeLeft>
                  ))}
                </ul>

              </div>

            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  )
}

const Contact = ({ lang }) => {
  const t = translations[lang];

  const cardStyle =
    "rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[.03] p-6 shadow-soft"


  const labelStyle = "text-gray-600 dark:text-white/70"
  const linkStyle = "text-gray-900 dark:text-white underline hover:text-primary-500 transition"

  return (
    <section id="contact" className="py-24 overflow-hidden">
      <Container>
        <SectionTitle title={t.contact.title} subtitle={t.contact.subtitle} />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-primary-600/10 to-emerald-500/10 p-1 h-full">
            <div className="rounded-[20px] bg-white dark:bg-slate-900/70 p-6 h-full flex flex-col overflow-hidden">
              <FadeUp delay={0.2}>
                <p className={labelStyle}>Email</p>
                <a className={linkStyle} href="mailto:ikhwanulhidayat22@gmail.com">
                  ikhwanulhidayat22@gmail.com
                </a>

                <p className={`${labelStyle} mt-4`}>LinkedIn</p>
                <a
                  className={linkStyle}
                  href="https://www.linkedin.com/in/ikhwanul-hidayat-87a196314"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/ikhwanul-hidayat
                </a>

                <p className={`${labelStyle} mt-4`}>GitHub</p>
                <a
                  className={linkStyle}
                  href="https://github.com/Ikhwanulhidayatvb"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/Ikhwanulhidayatvb
                </a>
              </FadeUp>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gradient-to-br from-primary-600/10 to-emerald-500/10 p-1 h-full">
            <div className="rounded-[20px] bg-white dark:bg-slate-900/70 p-6 h-full flex flex-col overflow-hidden">
              <p className={labelStyle}>Social Media</p>

              <div className="mt-3 flex flex-col gap-4 text-lg">
                <FadeUp delay={0.2}>
                  <a
                    className="flex items-center gap-2 text-gray-900 dark:text-white underline hover:text-primary-500 transition"
                    href="https://www.instagram.com/bugudigi_bud"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram className="text-2xl text-pink-500" />
                    Instagram
                  </a>
                </FadeUp>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
const Footer = () => (
  <footer className="py-10 border-t border-gray-200 dark:border-white/5 text-center text-gray-600 dark:text-white/50">
    <Container>
      <p>© {new Date().getFullYear()} Ikhwan All rights reserved.</p>
    </Container>
  </footer>
)

export default function App() {
  const [lang, setLang] = useState("en")
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)
  const [theme, setTheme] = useState("dark")
  const [time, setTime] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setTime(now.toLocaleTimeString("id-ID"))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      // Tambah progress lebih kecil biar lebih lambat
      value += Math.floor(Math.random() * 3) + 1;

      if (value >= 100) {
        value = 100;
        clearInterval(interval);

        setTimeout(() => {
          setLoading(false);
        }, 600); // delay sedikit lebih lama sebelum hilang
      }

      setProgress(value);
    }, 150); // interval lebih lama supaya perubahan teks lebih terlihat
    return () => clearInterval(interval);
  }, []);
  // 👋 Welcome hilang otomatis
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowWelcome(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [loading])

  if (loading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
        >

          {/* ☁️ CLOUD */}
          <div className="absolute inset-0 overflow-hidden z-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-3xl"
                style={{
                  width: `${120 + i * 40}px`,
                  height: `${70 + i * 30}px`,
                  top: `${10 + i * 12}%`,
                  left: "-30%",
                }}
                animate={{ x: ["0%", "160%"] }}
                transition={{
                  duration: 25 + i * 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 2
                }}
              />
            ))}
          </div>

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col items-center text-center">

            {/* GLOW */}
            <div className="absolute w-52 h-52 bg-blue-500/20 blur-3xl rounded-full"></div>

            {/* 👤 CHARACTER (2 IMAGE OVERLAY) */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6">

              {/* 😐 NORMAL */}
              <motion.img
                src={budikecil}
                className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-white/20 shadow-xl"
                animate={{
                  opacity: [1, 1, 0, 0, 1],
                  scale: [1, 1.02, 1, 1, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* 😄 SENYUM */}
              <motion.img
                src={budikecil2}
                className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-white/20 shadow-xl"
                animate={{
                  opacity: [0, 0, 1, 1, 0],
                  scale: [1, 1, 1.05, 1.05, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

            </div>

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-lg text-white/80 max-w-sm"
            >
              {progress < 30 && "Menyiapkan portfolio..."}
              {progress >= 30 && progress < 70 && "Sebentar ya, lagi dipoles biar keren "}
              {progress >= 70 && progress < 100 && "Hampir siap... jangan kabur dulu "}
              {progress === 100 && (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  Portfolio siap ditampilkan!
                </motion.div>
              )}
            </motion.div>

            {/* PROGRESS */}
            <div className="w-72 h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-cyan-400"
                animate={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 text-sm text-white/60">{progress}%</div>

          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors duration-500">

      <Navbar
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        time={time}
      />

      <Hero lang={lang} />
      <Projects lang={lang} />
      <Skills lang={lang} />
      <About lang={lang} />
      {/* ⭐ PORTFOLIO EXTRAS SECTION */}
      <section id="extra-portfolio" className="py-24">
        <Container>

          <SectionTitle
            title={translations[lang].portfolio.title}
            subtitle={translations[lang].portfolio.subtitle}
          />

          <div className="space-y-12">

            {/* 🎧 MUSIC PLAYER */}
            <Reveal>
              <MusicPlayer lang={lang} />
            </Reveal>

            <Reveal>
              <Gallery data={galleryData} lang={lang} />
            </Reveal>
          </div>

        </Container>
      </section>
      <Contact lang={lang} />
      <Footer />

    </div>
  )
}

