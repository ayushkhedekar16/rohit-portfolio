import { useRef, Suspense, lazy, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SmoothScroll from "@/components/SmoothScroll";
import BackToTop from "@/components/BackToTop";
import heroBg from "@/assets/hero-bg.jpg";

// Lazy load sections for better performance
const AboutSection = lazy(() => import("@/components/AboutSection"));
const CareerSection = lazy(() => import("@/components/CareerSection"));
const AcademiaSection = lazy(() => import("@/components/AcademiaSection"));
const AbilitiesSection = lazy(() => import("@/components/AbilitiesSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const Scene3D = lazy(() => import("@/components/Scene3D"));

const SectionSkeleton = () => (
  <div className="h-96 w-full animate-pulse bg-muted/20 flex items-center justify-center">
    <div className="text-muted-foreground font-accent text-xs tracking-widest">LOADING EXPERIENCE...</div>
  </div>
);

interface IndexProps {
  isVideoOpen: boolean;
  setIsVideoOpen: (val: boolean) => void;
}

const Index = ({ isVideoOpen, setIsVideoOpen }: IndexProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0]);

  return (
    <SmoothScroll>
      <div ref={containerRef} className="min-h-screen bg-background/90 text-foreground overflow-x-hidden relative">
        <AnimatePresence>
          {/* Fixed Background Layer */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Background Image */}
            <motion.div
              style={{ y: bgY }}
              className="absolute inset-0 opacity-20"
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${heroBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80 z-[1]" />

            {/* 3D Scene */}
            <Suspense fallback={null}>
              <motion.div style={{ opacity }} className="absolute inset-0 z-[2]">
                {!isVideoOpen && <Scene3D />}
              </motion.div>
            </Suspense>
          </div>

          {/* Scrollable Content */}
          <div className="relative z-10">
            <Header />
            <HeroSection />

            <Suspense fallback={<SectionSkeleton />}>
              <div className="line-accent" />
              <AboutSection />
              <div className="line-accent" />
              <CareerSection onModalToggle={setIsVideoOpen} />
              <div className="line-accent" />
              <AcademiaSection />
              <div className="line-accent" />
              <ExperienceSection />
              <div className="line-accent" />
              <AbilitiesSection />
              <div className="line-accent" />
              <ContactSection />
            </Suspense>
          </div>
        </AnimatePresence>
        <BackToTop />
      </div>
    </SmoothScroll>
  );
};

export default Index;
