import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const roles = [
  "VIDEO EDITOR",
  "MOTION DESIGNER",
  "VFX COMPOSITOR",
  // "3D ARTIST",
];

const PixelParticle = ({ x, y, delay, color }: { x: number; y: number; delay: number; color: string }) => (
  <motion.div
    initial={{ x: 0, y: 0, opacity: 1, scale: 2 }}
    animate={{
      x,
      y: y + (Math.random() * 50),
      opacity: 0,
      scale: 0,
    }}
    transition={{
      duration: 0.6,
      delay,
      ease: "easeOut"
    }}
    className="absolute w-1 h-1 will-change-transform"
    style={{ left: "50%", top: "100%", backgroundColor: color }}
  />
);

const EchoPulse = ({ word, className, color }: { word: string; className?: string; color: string }) => (
  <motion.span
    initial={{ scale: 1, opacity: 0.5 }}
    animate={{ scale: 1.4, opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`absolute inset-0 pointer-events-none ${className} will-change-transform`}
    style={{ color }}
  >
    {word}
  </motion.span>
);

const GhostImpact = ({ word, className, isVisual = false }: { word: string; className?: string; isVisual?: boolean }) => {
  const color1 = isVisual ? "#00f2ff" : "var(--primary)";
  const color2 = isVisual ? "#ff00ea" : "var(--accent)";

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {/* Chromatic Aberration Echos */}
      <EchoPulse word={word} className={className} color={color1} />
      <div className="translate-x-1">
        <EchoPulse word={word} className={className} color={color2} />
      </div>

      {/* Light Flash */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: [0, 0.8, 0], width: ["0%", "150%", "200%"] }}
        transition={{ duration: 0.4 }}
        className="absolute h-[1px] bg-gradient-to-r from-transparent via-white to-transparent will-change-[width,opacity]"
        style={{ top: "50%" }}
      />

      {/* Digital Pixel Scatter - Reduced count for performance */}
      {Array.from({ length: 3 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 200;
        const y = Math.random() * 20;
        return (
          <PixelParticle
            key={i}
            x={x}
            y={y}
            delay={Math.random() * 0.05}
            color={i % 2 === 0 ? color1 : color2}
          />
        );
      })}
    </div>
  );
};

const FallingWord = ({ word, delay, className, isInView, intenseDust = false }: { word: string; delay: number; className?: string; isInView: boolean; intenseDust?: boolean }) => {
  const [showImpact, setShowImpact] = useState(false);
  const isVisual = word === "VISUAL";
  const isArtist = word === "ARTIST";

  useEffect(() => {
    if (!isInView) {
      setShowImpact(false);
    }
  }, [isInView]);

  return (
    <div className="relative inline-block px-10">
      <motion.span
        initial={{ y: -600, opacity: 0, scaleY: 1.5 }}
        animate={isInView ? {
          y: 0,
          opacity: 1,
          scaleY: 1,
        } : {
          y: -600,
          opacity: 0,
          scaleY: 1.5,
        }}
        transition={{
          type: "spring",
          damping: 18,
          stiffness: 150,
          delay: isInView ? delay : 0,
          mass: 0.8
        }}
        onAnimationComplete={(definition) => {
          if ((definition as any).y === 0 && isInView) {
            setShowImpact(true);
          }
        }}
        className={`block cursor-default select-none relative z-10 will-change-transform ${className}`}
      >
        {word}
      </motion.span>
      {showImpact && <GhostImpact word={word} className={className} isVisual={isVisual} />}
      {isArtist && <LeaningMan isInView={isInView} />}
    </div>
  );
};

const LeaningMan = ({ isInView }: { isInView: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsVisible(true), 3500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isInView]);

  return isVisible ? (
    <motion.div
      initial={{ x: -5, opacity: 0, scale: 0.8 }}
      animate={{
        x: [-5, 5, 5, -5],
        opacity: [0, 1, 1, 0],
        scale: [0.8, 1, 1, 0.8]
      }}
      transition={{
        duration: 6.5,
        times: [0, 0.15, 0.85, 1],
        ease: "easeInOut"
      }}
      className="absolute -right-0 bottom-2 w-8 h-12 pointer-events-none select-none z-0"
    >
      <svg viewBox="0 0 100 200" className="w-full h-full filter drop-shadow-[0_0_5px_rgba(var(--primary),0.5)]">
        {/* Head */}
        <motion.circle
          cx="45" cy="30" r="14"
          fill="currentColor"
          className="text-primary/90"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />

        {/* Body */}
        <path
          d="M45 44 L45 120"
          stroke="currentColor" strokeWidth="12" strokeLinecap="round"
          className="text-primary/90"
        />

        {/* Left Arm (Leaning against the L) */}
        <motion.path
          initial={{ d: "M45 60 L35 90" }}
          animate={{ d: "M45 60 L15 80" }}
          transition={{ delay: 0.8, duration: 0.6 }}
          stroke="currentColor" strokeWidth="10" strokeLinecap="round"
          className="text-primary/90"
        />

        {/* Right Arm (Waving) */}
        <motion.path
          initial={{ d: "M45 60 L60 90" }}
          animate={{
            d: ["M45 60 L80 30", "M45 60 L95 50", "M45 60 L80 30"],
          }}
          transition={{
            delay: 1.4,
            duration: 0.5,
            repeat: 3,
            repeatType: "reverse"
          }}
          stroke="currentColor" strokeWidth="10" strokeLinecap="round"
          className="text-primary/90"
        />

        {/* Legs (Relaxed stance) */}
        <path
          d="M45 120 L30 185"
          stroke="currentColor" strokeWidth="12" strokeLinecap="round"
          className="text-primary/90"
        />
        <motion.path
          d="M45 120 L60 185"
          stroke="currentColor" strokeWidth="12" strokeLinecap="round"
          className="text-primary/90"
          animate={{ x: [0, 5, 0] }}
          transition={{ delay: 2.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>

      {/* "Hii!" Speech Bubble */}
      <motion.div
        initial={{ scale: 0, opacity: 0, filter: "blur(4px)", y: 5 }}
        animate={{
          scale: [0, 1.1, 1, 1, 0.9],
          opacity: [0, 1, 1, 1, 0],
          filter: ["blur(4px)", "blur(0px)", "blur(0px)", "blur(0px)", "blur(4px)"],
          y: [5, 0, 0, 0, -10]
        }}
        transition={{
          delay: 1.6,
          duration: 3.5,
          times: [0, 0.1, 0.15, 0.85, 1],
          ease: "easeInOut"
        }}
        className="absolute -top-5 -right-9 bg-secondary text-black text-[13px] font-bold px-2 py-1 tracking-tight rounded-2xl rounded-bl-none shadow-[0_0_15px_rgba(var(--primary),0.4)] origin-bottom-left"
      >
        Hello !
      </motion.div>
    </motion.div>
  ) : null;
};

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: isInView ? 0.5 : 0 }}
          className="text-[10px] md:text-xs tracking-[0.3em] text-primary font-arialBlack mb-5 uppercase"
        >
          CRAFTING VISUAL STORIES
        </motion.p>

        <h1 className="flex flex-col items-center text-4xl md:text-7xl lg:text-8lg font-papyrus tracking-[0.1em] mb-8">
          <FallingWord word="CREATIVE" delay={1} isInView={isInView} />
          <FallingWord word="VISUAL" delay={1.8} className="text-gradient py-2" isInView={isInView} />
          <FallingWord word="ARTIST" delay={2.6} intenseDust={true} isInView={isInView} />
        </h1>

        {/* Animated roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: isInView ? 3.5 : 0 }}
          className="flex flex-wrap justify-center gap-3 md:gap-6 mb-12"
        >
          {roles.map((role, i) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: isInView ? 3.7 + i * 0.15 : 0 }}
              className="text-[9px] md:text-[10px] tracking-[0.15em] px-5 py-2 border border-accent/30 text-primary rounded-full bg-accent/10 hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.2)] cursor-default font-accent font-semibold uppercase"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: isInView ? 4.5 : 0 }}
        >
          <a
            href="#career"
            className="inline-block px-7 py-3 bg-primary text-primary-foreground font-medium text-sm tracking-[0.15em] rounded-full hover:shadow-[0_0_40px_hsl(185_80%_55%/0.4)] transition-all duration-500"
          >
            VIEW MY WORK
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: isInView ? 5.5 : 0 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-muted-foreground">SCROLL</span>
        <div className="w-px h-5 bg-gradient-to-b from-primary/50 to-transparent animate-pulse-glow" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
