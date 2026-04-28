/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkle, Asterisk } from "lucide-react";

const navItems = [
  { number: "01", label: "Projects" },
  { number: "02", label: "Experience" },
  { number: "03", label: "Skills" },
  { number: "04", label: "Contact" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

interface HeaderProps {
  setCurrentPage: (page: any) => void;
  setIsMenuOpen: (open: boolean) => void;
  currentPage: string;
}

const Header = ({ setCurrentPage, setIsMenuOpen, currentPage }: HeaderProps) => (
  <header className="flex justify-between items-center w-full z-[150] shrink-0 mb-4 md:mb-0 relative py-2">
    <motion.div 
      variants={itemVariants} 
      initial="hidden" 
      animate="visible" 
      className="flex gap-2 items-center cursor-pointer min-w-[30px] sm:min-w-[40px]" 
      onClick={() => setCurrentPage('home')}
    >
      <Asterisk className="w-5 h-5 md:w-5 md:h-5 animate-spin-slow shrink-0" />
      <div className="hidden sm:block text-[7px] md:text-[10px] leading-tight uppercase font-medium tracking-tighter text-black">
        Open for any<br />collaborations and offers
      </div>
    </motion.div>

    <motion.h1 
      variants={itemVariants} 
      initial="hidden" 
      animate="visible"
      className="text-[11px] md:text-xl font-bold tracking-tighter cursor-pointer absolute left-1/2 -translate-x-1/2 whitespace-nowrap z-10"
      onClick={() => setCurrentPage('home')}
    >
      DK NISHWANTH©
    </motion.h1>

    <div className="flex items-center gap-4 min-w-[30px] sm:min-w-[40px] justify-end">
      {/* Mobile Menu Button - Hamburger */}
      <motion.button 
        onClick={() => setIsMenuOpen(true)}
        variants={itemVariants} 
        initial="hidden" 
        animate={{ opacity: 1, y: 0 }}
        className="flex md:hidden flex-col items-end gap-[5px] cursor-pointer group p-3 relative z-[200] bg-transparent border-none outline-none appearance-none"
      >
        <div className="w-6 h-[1.5px] bg-black transition-all" />
        <div className="w-4 h-[1.5px] bg-black transition-all" />
      </motion.button>

      {/* Desktop Folio Indicator */}
      <motion.div 
        variants={itemVariants} 
        initial="hidden" 
        animate="visible"
        className="hidden md:block text-[10px] text-right uppercase font-medium tracking-tighter"
      >
        Folio<br />Vol.2 —
      </motion.div>
    </div>
  </header>
);

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'Projects' | 'Experience' | 'Skills' | 'Contact'>('home');

  const projectsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!projectsRef.current) return;
    setIsDragging(true);
    setDragged(false);
    setStartX(e.pageX - projectsRef.current.offsetLeft);
    setScrollLeft(projectsRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !projectsRef.current) return;
    e.preventDefault();
    const x = e.pageX - projectsRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (Math.abs(walk) > 5) {
      setDragged(true);
    }
    projectsRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2800); // GIF time
    return () => clearTimeout(timer);
  }, []);

  const startNavigation = (label: any) => {
    setIsNavigating(label);
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentPage(label);
            setIsNavigating(null);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 3;
      });
    }, 80);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'Projects':
        const projects = [
          { 
            title: "SwitchStep", 
            desc: "Designed modular, eco-friendly footwear with retractable and detachable parts", 
            category: "Industrial Design / MSME",
            url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&q=60",
            link: "https://www.linkedin.com/in/nishwanth-dk"
          },
          { 
            title: "Timesheet Validation", 
            desc: "Built a bot to validate timesheets, detect missing hours, and generate error reports", 
            category: "Automation / RPA",
            url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=600&fit=crop&q=60",
            link: "https://www.linkedin.com/posts/nishwanth-dk_rpa-uipath-automation-activity-7334252189323825153-b3iz?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEbZioMB2keZd-ksw0VH3R-_N0GYu-HdMGU"
          },
          { 
            title: "Kolli Hills Spices", 
            desc: "Led UI/UX design and frontend development for a spice ecommerce site", 
            category: "UI/UX & Frontend",
            url: "https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=600&q=60",
            link: "https://www.linkedin.com/posts/nishwanth-dk_uiux-webdesign-figma-activity-7319240001928474624-G8rk?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEbZioMB2keZd-ksw0VH3R-_N0GYu-HdMGU"
          },
          { 
            title: "Spaceship Game", 
            desc: "Developed a space exploration game with interactive planets and custom UI", 
            category: "Game Dev / UE5",
            url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop&q=60",
            link: "https://www.linkedin.com/posts/nishwanth-dk_unrealengine-gamedevelopment-indiedev-activity-7315055371893514243-Z8oi?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEbZioMB2keZd-ksw0VH3R-_N0GYu-HdMGU"
          },
          { 
            title: "Aircraft Game", 
            desc: "Developed a high-speed aircraft simulation with custom flight mechanics", 
            category: "Game Dev / UE5",
            url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop&q=60",
            link: "https://www.linkedin.com/posts/nishwanth-dk_unrealengine-gamedevelopment-blueprint-activity-7350096066836320256-GOCY?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEbZioMB2keZd-ksw0VH3R-_N0GYu-HdMGU"
          }
        ];

        const designs = [
          { title: "Electric Go", category: "Mobile App Design", desc: "Electric rental vehicle booking app design with modern UI/UX", link: "https://www.behance.net/gallery/212573331/Electric-Go-%28-Electric-rental-vehicle-booking-app%29" },
          { title: "Poster Designs", category: "Graphic Design", desc: "Creative poster designs for various events and campaigns", link: "https://www.behance.net/gallery/212025573/Poster-Design" },
          { title: "Mall Landing Page", category: "Web Design", desc: "Modern and attractive landing page design for shopping mall", link: "https://www.behance.net/gallery/211960287/Landing-Page-for-Mall" },
          { title: "Resort Suggestion App", category: "Mobile App Design", desc: "Travel app design for resort recommendations", link: "https://www.behance.net/gallery/209151259/Resort-Suggestion-App" },
          { title: "Food Website Landing", category: "Web Design", desc: "Appetizing landing page design for food website", link: "https://www.behance.net/gallery/208369221/Landing-page-for-Foodwebsite" }
        ];

        return (
          <section className="flex-grow flex flex-col overflow-y-auto no-scrollbar scrollbar-hide py-12 gap-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {projects.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-5"
                >
                  <motion.a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer overflow-hidden border border-black/5 block shadow-sm hover:shadow-2xl"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                      loading="lazy" 
                      draggable={false}
                    />
                  </motion.a>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-tight">{item.title}</span>
                      <span className="text-[9px] font-bold opacity-30 uppercase">{item.category}</span>
                    </div>
                    <p className="text-[10px] font-medium uppercase leading-relaxed opacity-60 mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mb-20">
              <div className="flex items-center justify-between mb-12 border-t border-black/10 pt-12">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                  <Asterisk className="w-3 h-3" /> Design Portfolio
                </h2>
                <span className="text-[10px] font-mono opacity-20">VIEW ALL DESIGNS</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-black/5">
                 {designs.map((design, i) => (
                   <motion.a
                    key={i}
                    href={design.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-brand-bg p-8 hover:bg-black hover:text-white transition-all duration-500 block relative overflow-hidden"
                   >
                     <div className="text-[8px] font-bold uppercase tracking-widest opacity-40 mb-3 group-hover:text-white/60">
                        0{i+1} / {design.category}
                     </div>
                     <h3 className="text-2xl md:text-3xl font-serif italic tracking-tighter mb-4 group-hover:translate-x-2 transition-transform duration-500">{design.title}</h3>
                     <p className="text-[10px] font-medium uppercase leading-relaxed group-hover:text-white/80 max-w-[80%]">{design.desc}</p>
                     
                     <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-white/20 group-hover:bg-white text-black opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-45 group-hover:rotate-0">
                       <Sparkle className="w-4 h-4" />
                     </div>
                   </motion.a>
                 ))}
              </div>
            </div>
          </section>
        );
      case 'Experience':
        return (
          <section className="flex-grow flex flex-col justify-center py-12 max-w-4xl mx-auto w-full px-4 overflow-y-auto no-scrollbar">
            {[
              { company: "Brix Networks", role: "UI/UX Designer & Frontend Developer", period: "2026 – PRESENT", desc: "Leading the design and development of user-centric digital products." },
              { company: "Quick App Studio", role: "UI/UX Designer (Intern)", period: "FEB 2025 – JULY 2025", desc: "Designed user-friendly interfaces for mobile apps and websites in Figma." },
              { company: "Aishwarya Eye Foundation", role: "Assistant Architect", period: "DEC 2022", desc: "Architectural floor design for a specialized hospital floor." }
            ].map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-4 py-8 border-b border-black/10 items-baseline gap-4"
              >
                <span className="text-[10px] font-mono opacity-40">{exp.period}</span>
                <div className="md:col-span-2">
                  <h3 className="text-xl md:text-2xl font-medium tracking-tighter uppercase">{exp.role}</h3>
                  <p className="text-[10px] font-bold opacity-60 mt-1 uppercase tracking-widest">{exp.company}</p>
                </div>
                <p className="text-[11px] leading-relaxed uppercase font-medium">{exp.desc}</p>
              </motion.div>
            ))}
          </section>
        );
      case 'Skills':
        const certifications = [
          { category: "AI & Machine Learning", items: [
            { name: "AI-first Software Engineering", url: "https://drive.google.com/file/d/1MEdbtvzoaP7Nic4LScsNKNbhTTfYvjt-/view?usp=drive_link" },
            { name: "Artificial Intelligence (AI)", url: "https://drive.google.com/file/d/1z1lR8YDDWJDiK4Ut_NIvkSshpWEnnmrL/view?usp=drive_link" },
            { name: "AI Foundation Certification", url: "https://drive.google.com/file/d/1JDIpbfIttrRY3oKsAA2Gx90bJM7u-xpI/view?usp=drive_link" },
            { name: "Intro to AI", url: "https://drive.google.com/file/d/1UlNPQGLvK52LrBbxSpRXbjwfj3RHQn2X/view?usp=drive_link" },
            { name: "Intro to Deep Learning", url: "https://drive.google.com/file/d/1hi0vca2ZKer9snONSH6HEQZb-QT9x-AX/view?usp=drive_link" },
            { name: "Deep Learning for NLP", url: "https://drive.google.com/file/d/1rH4uMVda6RRdPTOcfF1gTUmVZZlERYyw/view?usp=drive_link" },
            { name: "Natural Language Processing", url: "https://drive.google.com/file/d/1Eyl573jRp2px-5SU6EolLDF9HPB8LfW_/view?usp=drive_link" },
            { name: "OpenAI GPT Models", url: "https://drive.google.com/file/d/1y7jhFMWDoQjDkptn-a8t-4FK83pRtPTD/view?usp=drive_link" },
            { name: "GPT-3 for Developers", url: "https://drive.google.com/file/d/1cLML6UH0eI4X8JMBEh1QhGJqL4L8KOuZ/view?usp=drive_link" },
            { name: "Prompt Engineering", url: "https://drive.google.com/file/d/1LcoCYgG8cm-bOpzXP3r3Y4l2bqWsD8TD/view?usp=drive_link" },
            { name: "AI Powered Chatbots", url: "https://drive.google.com/file/d/1kv1VYJUbHCp_w2SlL8ek5BPy0usgPOhw/view?usp=drive_link" }
          ]},
          { category: "Web & Game Dev", items: [
            { name: "Unity Game Development", url: "https://drive.google.com/file/d/13x-cYnNlpXjL8_9Badrgbwj4d0iD2BQp/view?usp=drive_link" },
            { name: "HTML5 - The Language", url: "https://drive.google.com/file/d/1kMoFl93VlZcJYcElKXQFXGybP1_eFq13/view?usp=drive_link" },
            { name: "CSS3 Mastery", url: "https://drive.google.com/file/d/1GIePDdNLHWf-dmfb4p7cVRaeGvAe929g/view?usp=drive_link" },
            { name: "JavaScript Certification", url: "https://drive.google.com/file/d/1WMiGbjR55ygLxxctDluYBIpeD9LHm2Hh/view?usp=drive_link" }
          ]},
          { category: "Algorithms & Backend", items: [
            { name: "DSA Using Java (Interactive)", url: "https://drive.google.com/file/d/1kRCM6cyMGazwJOFHpo73xSlMxLAlJDom/view?usp=drive_link" },
            { name: "DSA using Java", url: "https://drive.google.com/file/d/1eeEZKTuo24djSNj7YR4GfjMZNatQ4ZV_/view?usp=drive_link" },
            { name: "Hands-On DSA Java 11", url: "https://drive.google.com/file/d/1n5XxM-xjS5pF8cn56BY2bpxd9eG83VXZ/view?usp=drive_link" },
            { name: "Oracle SQL Basics", url: "https://drive.google.com/file/d/18wUY8r6Xse6NmcgWRXcyfEwTcTtXFJqj/view?usp=drive_link" }
          ]},
          { category: "Specialized", items: [
            { name: "Blockchain Overview", url: "https://drive.google.com/file/d/1bZoAsObR2AtmQRyj1e7L1IbwIkmzuYow/view?usp=drive_link" },
            { name: "Site Reliability Engineering", url: "https://drive.google.com/file/d/1FbUsAmvGmywHO4lF1Pr-_OJJxvdK78ha/view?usp=drive_link" },
            { name: "Intro to Data Analytics", url: "https://drive.google.com/file/d/1pvsfRiACpKPRs4DaDLH5hJq1Zf0JvFLZ/view?usp=drive_link" },
            { name: "Design Thinking", url: "https://drive.google.com/file/d/14PUp4WhPr7jfR3P7y78MEt9AIxBN1b8M/view?usp=drive_link" },
            { name: "Core JAVA Programming", url: "https://drive.google.com/file/d/1M-kIkaxwZy7gVzcY0LopFCX_usl_KTQh/view?usp=drive_link" }
          ]}
        ];

        return (
          <section className="flex-grow flex flex-col py-12 px-4 overflow-y-auto no-scrollbar gap-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start">
              {[
                { title: "Code", items: [
                  { name: "HTML", percent: "95%" },
                  { name: "CSS", percent: "90%" },
                  { name: "JavaScript", percent: "88%" },
                  { name: "Python", percent: "85%" },
                  { name: "Java", percent: "80%" },
                  { name: "React", percent: "—" }
                ]},
                { title: "Design", items: [
                  { name: "Figma", percent: "92%" },
                  { name: "AutoCAD", percent: "88%" },
                  { name: "SketchUp", percent: "90%" },
                  { name: "Photoshop", percent: "85%" },
                  { name: "Illustrator", percent: "80%" }
                ]},
                { title: "Game & 3D", items: [
                  { name: "Unreal Engine 5", percent: "75%" },
                  { name: "Unity", percent: "70%" },
                  { name: "Revit Arch", percent: "—" },
                  { name: "After Effects", percent: "—" }
                ]},
                { title: "Automation", items: [
                  { name: "UiPath", percent: "85%" },
                  { name: "Excel Auto", percent: "90%" },
                  { name: "Process Opt", percent: "80%" },
                  { name: "AI Tools", percent: "—" }
                ]}
              ].map((group, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-4 md:gap-6"
                >
                  <h3 className="text-[10px] font-bold uppercase tracking-widest bg-black text-white px-2 py-1 self-start">{group.title}</h3>
                  <ul className="flex flex-col gap-2 md:gap-3">
                    {group.items.map((item, j) => (
                      <li key={j} className="flex flex-col">
                        <div className="flex justify-between items-baseline gap-2">
                          <span className="text-[13px] md:text-[15px] font-medium uppercase tracking-tighter transition-all">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-mono opacity-30 italic">{item.percent}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-black/10 pt-12">
              <h2 className="text-[10px] font-bold uppercase tracking-widest mb-8">Professional Certifications / 24</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 md:gap-x-12 gap-y-10 md:gap-y-12">
                {certifications.map((certGroup, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-4"
                  >
                    <h4 className="text-[9px] font-bold uppercase tracking-wider text-black/40">{certGroup.category}</h4>
                    <ul className="flex flex-col gap-2">
                      {certGroup.items.map((cert, j) => (
                        <li key={j}>
                          <a 
                            href={cert.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[11px] font-medium uppercase tracking-tight hover:opacity-50 transition-opacity flex justify-between group"
                          >
                            <span>{cert.name}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      case 'Contact':
        return (
          <section className="flex-grow flex flex-col items-center justify-center py-12 gap-12 px-4">
             <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
             >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Get in touch</p>
                <a href="mailto:dknishwanth1718@gmail.com" className="text-4xl md:text-7xl font-serif italic tracking-tighter hover:opacity-50 transition-opacity">
                  dknishwanth1718<br/>@gmail.com
                </a>
             </motion.div>
             <div className="flex gap-8 md:gap-16 flex-wrap justify-center items-center">
                {[
                  { label: "LinkedIn", url: "https://www.linkedin.com/in/nishwanth-dk" },
                  { label: "Behance", url: "https://www.behance.net/dknishwanth" },
                  { label: "GitHub", url: "#" },
                  { label: "Resume (PDF)", url: "/DK_Nishwanth .pdf" }
                ].map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="text-[11px] font-bold uppercase tracking-widest border-b border-black/20 hover:border-black transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
             </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[500] bg-[#111111] text-white flex flex-col p-6 md:p-12 overflow-hidden"
            >
              {/* Menu Header */}
              <div className="flex justify-between items-center w-full shrink-0">
                <div className="flex gap-2 items-center opacity-40">
                  <Asterisk className="w-4 h-4 animate-spin-slow" />
                  <span className="text-[9px] uppercase tracking-widest font-bold">Menu</span>
                </div>
                <div className="text-[11px] font-bold tracking-tighter absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
                  DK NISHWANTH©
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-end cursor-pointer -mr-2 bg-transparent border-none outline-none"
                >
                  <div className="relative w-6 h-6">
                    <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-white rotate-45" />
                    <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-white -rotate-45" />
                  </div>
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-grow flex flex-col justify-center gap-8 py-8">
                {navItems.map((item, idx) => {
                  const words = item.label.split(' ');
                  return (
                    <motion.div
                      key={idx}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + (idx * 0.1), ease: [0.22, 1, 0.36, 1], duration: 0.8 }}
                      onClick={() => {
                        setIsMenuOpen(false);
                        startNavigation(item.label);
                      }}
                      className="flex flex-col cursor-pointer group relative pl-8"
                    >
                      <span className="absolute left-0 top-1 text-[10px] font-mono text-white/20">{item.number}</span>
                      <div className="flex flex-col">
                        <span className={`${words.length > 1 ? 'font-serif italic text-white/60' : 'font-sans font-bold'} text-[13vw] md:text-[8vw] tracking-tighter group-hover:text-white transition-colors leading-tight`}>
                          {words[0]}
                        </span>
                        {words.length > 1 && (
                          <span className="text-[13vw] md:text-[8vw] font-bold uppercase tracking-tighter ml-8 -mt-4 group-hover:italic transition-all leading-tight">
                            {words.slice(1).join(' ')}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Menu Credits */}
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 mt-auto pb-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest mb-1">Developer</span>
                    <span className="text-[10px] font-bold uppercase">DK Nishwanth</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest mb-1">Based In</span>
                    <span className="text-[10px] font-bold uppercase">Ooty, India</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest mb-1">Portfolio</span>
                    <span className="text-[10px] font-bold uppercase">V. 2.0</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest mb-1">Current Year</span>
                    <span className="text-[10px] font-bold uppercase">2026©</span>
                  </div>
                </div>
              </div>

              <footer className="text-center text-[8px] font-medium opacity-20 py-2 uppercase tracking-[0.2em]">
                Just an ordinary designer.
              </footer>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isNavigating && (
            <motion.div
              initial={{ scaleY: 0, originY: 0.5 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 bg-black z-[400] flex flex-col items-center justify-center text-white"
            >
              <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-[10px] md:text-[11px] font-medium tracking-widest uppercase opacity-80 z-10">
                Loading — <span className="italic font-serif">{loadingProgress}%</span>
              </div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center justify-center scale-110 md:scale-150"
              >
                <span className="text-[12vw] md:text-[10vw] font-serif italic leading-[0.7] tracking-tighter">{isNavigating}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {isInitialLoading && currentPage === 'home' && (
          <AnimatePresence>
            <motion.div
              key="initial-loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
              className="fixed inset-0 z-[1000] bg-[#ececec] flex items-center justify-center overflow-hidden pointer-events-none"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-64 md:w-96 flex flex-col items-center gap-8"
              >
                <img 
                  src="/From KlickPin CF Illustration Running GIF by John Larigakis - Find & Share on GIPHY _ Gif Insan Videolar - Pin-683491680955146882.gif" 
                  alt="Loading..." 
                  className="w-full h-auto mix-blend-multiply transition-all duration-700"
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse text-center leading-relaxed">
                    Just an ordinary designer.<br />From Ooty with Love
                  </div>
                  <div className="w-32 h-[1px] bg-black/10 relative overflow-hidden">
                    <motion.div 
                      initial={{ left: "-100%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-black/40"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}

      {currentPage !== 'home' ? (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-screen bg-brand-bg text-brand-text flex flex-col px-6 md:px-12 py-6 selection:bg-brand-text selection:text-brand-bg overflow-hidden"
        >
        <Header setCurrentPage={setCurrentPage} setIsMenuOpen={setIsMenuOpen} currentPage={currentPage} />

        <section className="flex shrink-0 pt-6 md:pt-10 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 w-full items-center gap-4 md:gap-8 relative">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] font-bold uppercase tracking-widest text-center md:text-left leading-relaxed max-w-[200px] mx-auto md:mx-0"
            >
              {currentPage === 'Projects' ? 'SELECTED WORKS I HAVE DONE SINCE 2022' : currentPage.toUpperCase()}
            </motion.div>
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center whitespace-nowrap"
            >
              <span className="text-[10vw] md:text-[8vw] font-serif italic leading-[1.1] md:leading-[1.1] tracking-tighter">{currentPage}</span>
            </motion.div>
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] font-bold uppercase tracking-widest text-center md:text-right leading-relaxed max-w-[200px] mx-auto md:mr-0"
            >
              / 0{navItems.findIndex(i => i.label === currentPage) + 1}
            </motion.div>
          </div>
        </section>

        {renderContent()}

        <div className="hidden md:block w-full relative shrink-0">
          <div className="grid grid-cols-4 gap-4 pb-12 border-t border-black/10 pt-4 relative z-10">
            {navItems.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="group cursor-pointer"
                whileHover={{ x: 5 }}
                onClick={() => {
                  if (item.label === currentPage) {
                    // Already here
                  } else {
                    startNavigation(item.label);
                  }
                }}
              >
                <div className={`text-[10px] font-mono mb-1 ${item.label === currentPage ? 'text-brand-text' : 'text-brand-text/30'}`}>{item.number}</div>
                <div className={`text-sm font-medium uppercase tracking-tight ${item.label === currentPage ? 'text-brand-text italic' : 'text-brand-text/30'}`}>
                  {item.label}
                </div>
              </motion.div>
            ))}
            <div className="absolute right-0 bottom-8 md:bottom-12 text-sm font-medium">©2026</div>
          </div>
        </div>
      </motion.main>
      ) : (
        <motion.main
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="h-screen bg-brand-bg text-brand-text flex flex-col px-4 md:px-12 py-6 selection:bg-brand-text selection:text-brand-bg relative transition-colors duration-700 overflow-hidden"
        >
          <Header setCurrentPage={setCurrentPage} setIsMenuOpen={setIsMenuOpen} currentPage={currentPage} />

          {/* Hero Section */}
          <section className="flex-grow flex flex-col items-center justify-center pt-2 md:pt-12 py-4 overflow-visible">
            {/* Mobile-only layout focused on the reference image */}
            <div className="flex md:hidden flex-col items-center w-full max-h-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center mb-4"
              >
                <div className="flex flex-col items-center">
                  <span className="text-[16vw] font-serif italic leading-none tracking-tighter pb-2">Nishwanth</span>
                </div>
                {/* Asterisk removed as per request */}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex flex-col items-center text-center gap-6 mb-8 max-w-[85vw]"
              >
                <p className="text-[10px] font-bold leading-[1.6] tracking-[0.14em] uppercase">
                  PASSIONATE ABOUT CREATING UNFORGETTABLE AND BEAUTIFUL DIGITAL EXPERIENCES.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="w-[90vw] md:w-full max-w-[600px] pointer-events-none"
              >
                <video 
                  src="/From KlickPin CF Brands create Brand Vision [Video] _ Motion design animation Motion graphics inspiration Motion graphics design - Pin-715579828275294771.mp4" 
                  alt="Context" 
                  className="w-full h-auto grayscale contrast-125 saturate-0 mix-blend-multiply"
                  autoPlay
                  loop
                  muted
                />
              </motion.div>
            </div>

            {/* Desktop-friendly Hero Layout */}
            <motion.div 
              variants={heroVariants}
              className="hidden md:flex flex-col items-center justify-center py-8"
            >
              <span className="text-[12vw] font-serif italic leading-none tracking-tighter">
                Nishwanth
              </span>
            </motion.div>
          </section>

          {/* Navigation & Year - Desktop Hide logic or integrated */}
          <div className="hidden md:block w-full relative z-10 py-6 md:py-20">
            <AnimatePresence>
              {hoveredItem && !isNavigating && (
                <motion.div
                  initial={{ scaleY: 0, originY: 0.5 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[-20vw] right-[-20vw] h-20 md:h-36 top-1/2 -translate-y-1/2 bg-black z-0 pointer-events-none flex items-center justify-center overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    className="text-[20vw] md:text-[22vw] font-bold text-white uppercase tracking-tighter select-none whitespace-nowrap"
                  >
                    {hoveredItem}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 px-0 relative z-10">
              {navItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => startNavigation(item.label)}
                  className="group cursor-pointer py-2 md:py-4 relative z-20"
                >
                  <div className={`text-[9px] md:text-[10px] font-mono mb-1 transition-colors duration-300 ${hoveredItem === item.label ? 'text-white' : (hoveredItem ? 'text-brand-text/20' : 'text-brand-text')}`}>
                    {item.number}
                  </div>
                  <div className={`text-[12px] md:text-sm font-medium uppercase tracking-tight group-hover:italic transition-all duration-300 ${hoveredItem === item.label ? 'text-white' : (hoveredItem ? 'text-brand-text/20' : 'text-brand-text')}`}>
                    {item.label}
                  </div>
                </motion.div>
              ))}
              <motion.div 
                variants={itemVariants}
                className={`absolute right-0 top-1/2 -translate-y-1/2 text-xs md:text-sm font-medium transition-colors duration-300 ${hoveredItem ? 'text-brand-text/20' : 'text-brand-text'}`}
              >
                ©2026
              </motion.div>
            </div>
          </div>

          {/* Desktop-only Intro Section */}
          <section className="hidden md:grid grid-cols-3 gap-8 items-center py-6 border-t border-black/10 mt-auto -mt-20">
            <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start text-center md:text-left gap-4 order-2 md:order-1 px-4 md:px-0">
              <Sparkle className="w-5 h-5 flex-shrink-0" />
              <p className="text-[9px] md:text-[10px] font-bold leading-relaxed tracking-[0.14em] md:tracking-wider max-w-[280px] md:max-w-[200px] uppercase">
                PASSIONATE ABOUT CREATING UNFORGETTABLE AND BEAUTIFUL DIGITAL EXPERIENCES.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex justify-center order-1 md:order-2 w-full -mt-8"
            >
              <div className="relative w-full md:w-[500px] h-56 md:h-[280px] flex items-center justify-center">
                <video 
                  src="/From KlickPin CF Brands create Brand Vision [Video] _ Motion design animation Motion graphics inspiration Motion graphics design - Pin-715579828275294771.mp4" 
                  alt="Illustration" 
                  className="w-full h-full object-contain mix-blend-multiply contrast-125 saturate-0 grayscale"
                  autoPlay
                  loop
                  muted
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="hidden md:flex flex-col items-center md:items-end text-center md:text-right gap-4 order-3">
              <Sparkle className="w-5 h-5 flex-shrink-0" />
              <p className="text-[9px] md:text-[10px] font-bold leading-relaxed tracking-wider max-w-[200px] uppercase">
                BRIDGING THE GAP BETWEEN PHYSICAL SPACE AND DIGITAL INTERFACES THROUGH CODE AND CREATIVITY.
              </p>
            </motion.div>
          </section>

          {/* Footer text - Integrated into the bottom */}
          <motion.footer 
            variants={itemVariants}
            className="text-center pt-8 md:pt-2 pb-4 text-[9px] md:text-[10px] font-medium opacity-80"
          >
            Just an ordinary designer. From Ooty with love.
          </motion.footer>
        </motion.main>
      )}
      </>
    );
  }

