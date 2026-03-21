import { motion } from "framer-motion";
import premiereIcon from "../assets/softwareicons/premiere.svg";
import afterEffectsIcon from "../assets/softwareicons/after_effects.svg";
import mayaIcon from "../assets/softwareicons/maya.svg";
import auditionIcon from "../assets/softwareicons/audition.svg";
import photoshopIcon from "../assets/softwareicons/photoshop.svg";
import nukeIcon from "../assets/softwareicons/nuke.png";

const skills = [
  { name: "Adobe Premiere Pro", level: 90, category: "Editing", icon: premiereIcon },
  { name: "Adobe After Effects", level: 85, category: "Motion", icon: afterEffectsIcon },
  { name: "Autodesk Maya", level: 55, category: "3D", icon: mayaIcon },
  { name: "Adobe Audition", level: 50, category: "Audio", icon: auditionIcon },
  { name: "Adobe Photoshop", level: 80, category: "Design", icon: photoshopIcon },
  { name: "Nuke", level: 70, category: "VFX", icon: nukeIcon },
];

const AbilitiesSection = () => {
  return (
    <section id="abilities" className="pt-8 pb-24 md:pt-16 md:pb-22 px-6 md:px-12 lg:px-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p className="text-[12px] tracking-[0.3em] text-primary mb-2 font-accent">05 — ABILITIES</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <img src={skill.icon} alt={skill.name} loading="lazy" className="w-5 h-5 object-contain" />
                  <span className="font-display font-medium text-sm group-hover:text-primary transition-colors">
                    {skill.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-[0.2em] text-muted-foreground">{skill.category.toUpperCase()}</span>
                  <span className="text-xs text-primary font-medium">{skill.level}%</span>
                </div>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AbilitiesSection;
