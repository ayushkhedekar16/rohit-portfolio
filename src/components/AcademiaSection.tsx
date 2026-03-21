import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    year: "2018 - 2019",
    title: "10th Std (SSC)",
    institution: "Kantilal Khinwasara English Medium School, Pune",
    type: "degree",
    description: "Maharashtra State Board of Secondary & Higher Secondary Education, Pune"
  },
  {
    year: "2020 - 2021",
    title: "12th Std (HSC) - Commerce",
    institution: "Dr. D. Y. Patil Junior College, Pune",
    type: "degree",
    description: "Maharashtra State Board of Secondary & Higher Secondary Education, Pune"
  },
  {
    year: "2024",
    title: "VFX Compositing Course",
    institution: "Tron Animation, Pune",
    type: "cert",
    description: "Specialized training in VFX compositing and industry-standard workflows."
  },
  {
    year: "2022 - 2025",
    title: "B.Voc in Media and Entertainment",
    institution: "Dr. D. Y. Patil Arts, Commerce & Science College, Pune",
    type: "degree",
    description: "Graduation focused on media and entertainment production."
  },
];

const AcademiaSection = () => {
  return (
    <section id="academia" className="pt-8 pb-24 md:pt-16 md:pb-20 px-6 md:px-12 lg:px-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="mb-16"
        >
          <p className="text-[12px] tracking-[0.3em] text-primary mb-2 font-accent">03 — ACADEMIA & CERTIFICATIONS</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Education <span className="text-gradient">Timeline</span>
          </h2>
        </motion.div>

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Animated Horizontal Line - Desktop Only */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent origin-left z-0 hidden md:block"
          />

          {/* Animated Vertical Line - Mobile Only */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute left-6 top-0 bottom-12 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent origin-top z-0 block md:hidden"
          />

          <div className="flex flex-col-reverse md:flex-row md:flex-nowrap justify-center md:gap-x-10 gap-y-0 md:gap-y-12 pb-8 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {education.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: 0.4 + (i * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex-shrink-0 w-full md:max-w-[270px] relative pt-0 pb-12 md:pt-10 px-2 pl-12 md:pl-2 text-left md:text-center group"
              >
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

                <span className="text-primary text-sm font-display font-bold">{item.year}</span>
                <div className="mt-2 flex md:justify-center">
                  {item.type === "degree" ? (
                    <GraduationCap size={16} className="text-secondary" />
                  ) : (
                    <Award size={16} className="text-primary/60" />
                  )}
                </div>
                <h4 className="font-display font-semibold text-sm mt-2 leading-tight md:whitespace-nowrap">{item.title}</h4>
                <p className="text-xs text-muted-foreground/100 mt-1 font-medium md:whitespace-nowrap">{item.institution}</p>
                <p className="text-[10px] text-muted-foreground/80 mt-1 leading-relaxed max-w-[200px] md:mx-auto">
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

export default AcademiaSection;
