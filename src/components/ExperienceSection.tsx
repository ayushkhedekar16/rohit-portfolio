import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Building2, ChevronRight } from "lucide-react";
import { useState } from "react";

const experiences = [
  {
    year: "Jan 2024 - Aug 2025",
    role: "Freelance Video Editor",
    company: "Independent",
    description: "Conducted freelance video editing projects for various clients, delivering high-quality visual content.",
    achievements: [
      "Edited video for various clients",
      "Created engaging visual effects and transitions",
      "Deliver final videos within deadline",
      "Managed multiple projects simultaneously"
    ]
  },
  {
    year: "Feb 2025 - Aug 2025",
    role: "Video Editor Intern",
    company: "Yellow Shutter Media, Pune",
    description: "6-month paid internship focused on professional video editing workflows and media production.",
    achievements: [
      "Demonstrated expertise in editing promotional videos, documentaries, and commercials for clients",
      "Developed and implemented creative strategies to maximize visual appeal of videos",
      "Collaborated with clients to refine concepts and ensure timely delivery",
      "Created engaging storytelling through precise cuts, transitions, sound design, and motion graphics"
    ]
  },
  {
    year: "Oct 2025 - Present",
    role: "Video Editor & Motion Graphic Designer",
    company: "Innothoughts Systems Pvt Ltd, Pune",
    description: "Full-time role managing video production and dynamic motion graphics for diverse digital platforms.",
    achievements: [
      "Edited promotional videos, commercials, social media content, YouTube videos, short films and corporate presentations",
      "Strong understanding of storytelling, pacing, color grading, sound design, and motion graphics",
      "Managed end-to-end post-production workflows including footage organization, rough cuts, and final edits",
      "Exported optimized content for multiple platforms and managed digital asset organization"
    ]
  },
];

const ExperienceSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="pt-8 pb-24 md:pt-16 md:pb-16 px-6 md:px-12 lg:px-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="mb-1"
        >
          <p className="text-[12px] tracking-[0.3em] text-primary mb-2 font-accent">04 — PROFESSIONAL EXPERIENCE</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Experience <span className="text-gradient">Timeline</span>
          </h2>
        </motion.div>

        {/* Horizontal timeline */}
        <div className="relative pt-16 md:pt-15">
          {/* Animated Horizontal Line - Desktop Only */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute top-[88px] md:top-[87px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent origin-left z-0 hidden md:block"
          />

          {/* Animated Vertical Line - Mobile Only */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute left-6 top-0 bottom-12 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent origin-top z-0 block md:hidden"
          />

          <div className="flex flex-col-reverse md:flex-row md:flex-nowrap justify-center md:gap-x-8 gap-y-0 md:gap-y-10 pb-8 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {experiences.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: 0.4 + (i * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex-shrink-0 w-full md:max-w-[320px] relative pt-0 pb-12 md:pt-12 px-2 pl-12 md:pl-2 text-left md:text-center group"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Achievement Box / Tooltip */}
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                      exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                      transition={{ duration: 0.2 }}
                      style={{ left: "50%" }}
                      className="absolute bottom-full mb-6   w-[calc(100vw-3rem)] max-w-72 p-4 rounded-xl bg-card/95 backdrop-blur-md border border-primary/30 shadow-2xl z-20 pointer-events-none"
                    >
                      <div className="text-left space-y-2">
                        <p className="text-[10px] font-bold text-primary mb-2 uppercase tracking-wider">Key Contributions:</p>
                        {item.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex gap-2 items-start">
                            <ChevronRight size={12} className="text-primary mt-1 flex-shrink-0" />
                            <p className="text-[10px] text-foreground font-medium leading-tight">{achievement}</p>
                          </div>
                        ))}
                      </div>
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-card/95" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0, x: "-50%", y: 0 }}
                  whileInView={{ scale: 1, opacity: 1, x: "-50%", y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4 + (i * 0.2), duration: 0.5, ease: "backOut" }}
                  style={{ left: "var(--node-left, 50%)" }}
                  className="absolute top-0 md:top-[14px] [--node-left:24px] md:[--node-left:50%] w-5 h-5 rounded-full border-2 border-primary/50 bg-background flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_15px_hsl(185_80%_55%/0.4)] transition-all duration-300 z-10"
                >
                  <div className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                </motion.div>

                <span className="text-primary text-sm font-display font-bold cursor-default">{item.year}</span>
                <div className="mt-2 flex md:justify-center">
                  <Building2 size={16} className="text-secondary" />
                </div>
                <h4 className="font-display font-semibold text-sm mt-2 leading-tight group-hover:text-primary transition-colors cursor-default md:whitespace-nowrap">{item.role}</h4>
                <p className="text-xs text-muted-foreground/100 mt-1 font-bold">{item.company}</p>
                <p className="text-[10px] text-muted-foreground/80 mt-1 leading-relaxed max-w-[250px] mx-auto">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
