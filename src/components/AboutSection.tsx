import { motion } from "framer-motion";
import { Film, Wand2, Layers } from "lucide-react";
import profileImg from "@/assets/profile.png";

const specialties = [
  { icon: Film, title: "Video Editing", desc: "Cinematic storytelling through precision cuts, color grading, and seamless transitions." },
  { icon: Wand2, title: "Motion Graphics", desc: "Dynamic visual communication with animated typography, infographics, and title sequences." },
  { icon: Layers, title: "VFX Compositing", desc: "Seamless integration of CGI elements with live-action footage for photorealistic results." },
];

const AboutSection = () => {
  return (
    <section id="about" className="pt-8 pb-24 md:pt-16 md:pb-20 px-6 md:px-12 lg:px-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-10">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative shrink-0 group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-accent to-secondary blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500" />

            {/* Image Container */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-[2px] bg-gradient-to-tr from-primary via-white/30 to-secondary relative z-10">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-background">
                <img
                  src={profileImg}
                  alt="Rohit Yadav - Visual Artist"
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex-1 text-center md:text-left"
          >
            <p className="text-[12px] tracking-[0.3em] text-primary mb-2 font-accent">01 — ABOUT ME</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">
              Hello, <span className="text-gradient">I am Rohit Yadav</span>
            </h2>
            <p className="text-foreground/80 text-lg md:text-xl leading-relaxed italic">
              I am a dynamic Video Editor and Visual Artist with over two years of experience crafting high-impact content for digital and marketing platforms. My workflow combines industry-standard tools like Adobe Creative Suite with advanced AI technologies, including Runway, Google Veo, and Topaz Video AI, to deliver cinematic stories with precision and efficiency. I focus on transforming complex ideas into compelling narratives that resonate with audiences, balancing artistic vision with strategic engagement.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          {specialties.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 40
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.1
              }}
              className="h-full"
            >
              <div className="group p-6 rounded-xl border-glow bg-card/40 hover-glow cursor-default h-full flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors shrink-0">
                  <item.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-display font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed flex-grow">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
