import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const projects = [
  {
    title: "Booking Engine Ad",
    category: "MOTION GRAPHICS",
    description: "A dynamic promotional showcase for a complex SaaS booking platform.",
    keyRole: "Built high-end motion graphics from wireframes, synchronized rhythmic transitions, and handled the full narrative pacing to make technical features feel exciting.",
    video: "https://vimeo.com/1174273464", // Linked to your Vimeo account!
    thumbnail: "/Portfolio_Video/Thumbnails/01.jpg", // Add high-res static images later
    color: "primary",
  },
  {
    title: "Awakening Journey",
    category: "VIDEO EDITING",
    isVertical: true,
    description: "A high-energy event teaser for a spiritual workshop and retreat series.",
    keyRole: "Performed cinematic color grading on raw vlog-style footage and implemented fast-paced rhythmic editing to build emotional momentum and audience engagement.",
    video: "https://vimeo.com/1174273539",
    thumbnail: "/Portfolio_Video/Thumbnails/02.jpg",
    color: "secondary",
  },
  {
    title: "Digital Card Ad",
    category: "MOTION GRAPHICS",
    description: "A premium 2D motion design piece for a financial technology product.",
    keyRole: "Managed the 2D lighting, texturing, and camera movement to create a photorealistic reveal of a high-end metal card from basic 2D assets.",
    video: "https://vimeo.com/1174273602",
    thumbnail: "/Portfolio_Video/Thumbnails/03.jpg",
    color: "accent",
  },
  {
    title: "Clothing Brand Reel",
    category: "VIDEO EDITING",
    isVertical: true,
    description: "Vibrant, beat-synced streetwear edit with rapid outfit swaps and high-energy transitions.",
    keyRole: "Beat-mapped with sharp match-cuts, golden hour grading, and a triptych layout to create a punchy, high-end editorial feel.",
    video: "https://vimeo.com/1174274620",
    thumbnail: "/Portfolio_Video/Thumbnails/04.jpg",
    color: "primary",
  },
  {
    title: "Real Estate Informative Video",
    category: "VIDEO EDITING",
    description: "An informative video by NoBrokerage.com explaining freehold vs. leasehold properties.",
    keyRole: "Produced engaging, fast-paced content using motion graphics and B-roll while maintaining strong brand consistency.",
    video: "https://vimeo.com/1174273634",
    thumbnail: "/Portfolio_Video/Thumbnails/05.jpg",
    color: "secondary",
  },
  {
    title: "Real Estate Project Expo",
    category: "VIDEO EDITING",
    isVertical: true,
    description: "A festive promotional explainer for Brickfolio’s Global Property Expo 2025.",
    keyRole: "Blended visuals seamlessly with dynamic edits, rhythmic pacing, and energetic audio to build momentum and drive strong audience engagement.",
    video: "https://vimeo.com/1174273695",
    thumbnail: "/Portfolio_Video/Thumbnails/06.jpg",
    color: "accent",
  },
  {
    title: "Indigestion Kit Product Ad",
    category: "VIDEO EDITING",
    description: "A professional commercial explainer for a digital healthcare product line.",
    keyRole: "Orchestrated the full post-production workflow, including detailed motion graphic call-outs, audio clean-up, and localized graphic text overlays.",
    video: "https://vimeo.com/1174273751",
    thumbnail: "/Portfolio_Video/Thumbnails/07.jpg",
    color: "primary",
  },
  {
    title: "OhBeauty Promo",
    category: "VIDEO EDITING",
    isVertical: true,
    description: "A social media short showcasing the brand’s mobile interface, key beauty categories, and discounts.",
    keyRole: "Crafted a fast-paced vlog-style edit with dynamic overlays, smooth UI visuals, refined color grading, and balanced sound for an engaging promo.",
    video: "https://vimeo.com/1174274502",
    thumbnail: "/Portfolio_Video/Thumbnails/08.jpg",
    color: "secondary",
  },
  {
    title: "Logo Evolution: Debranding",
    category: "VIDEO EDITING",
    isVertical: true,
    description: "An informative video that explains the rise of debranding and app-first identity.",
    keyRole: "Created a fast-paced, high-retention edit with split-screen visuals, bold motion graphics, and dynamic typography optimized for social media.",
    video: "https://vimeo.com/1174274543",
    thumbnail: "/Portfolio_Video/Thumbnails/09.jpg",
    color: "accent",
  },
  {
    title: "Medicine Product Ad",
    category: "VIDEO EDITING",
    isVertical: true,
    description: "A pharmaceutical product advertisement designed for clarity and clinical trust.",
    keyRole: "Edited raw interview and B-roll footage into a coherent medical explainer, using clean motion overlays to highlight key performance data and benefits.",
    video: "https://vimeo.com/1174274736",
    thumbnail: "/Portfolio_Video/Thumbnails/10.jpg",
    color: "primary",
  },
  {
    title: "iThrive Certification Program",
    category: "VIDEO EDITING",
    description: "Promo for iThrive Academy & Research Centre showcases their Functional Nutrition Certification.",
    keyRole: "Transformed a technical health topic into an engaging story through dynamic pacing, clean motion graphics, strategic B-roll, professional color grading, and polished audio.",
    video: "https://vimeo.com/1174274684",
    thumbnail: "/Portfolio_Video/Thumbnails/11.jpg",
    color: "secondary",
  },
  {
    title: "AI Mastery: Workshop Promo",
    category: "VIDEO EDITING",
    description: "Fast-paced promo with Pritam Nagrale, showcasing AI in business to drive workshop sign-ups.",
    keyRole: "Handled end-to-end editing with fast cuts, bold motion graphics, and polished visuals to elevate the overall impact.",
    video: "https://vimeo.com/1174274573",
    thumbnail: "/Portfolio_Video/Thumbnails/12.jpg",
    color: "accent",
  },
];

interface CareerSectionProps {
  onModalToggle?: (isOpen: boolean) => void;
}

const CareerSection = ({ onModalToggle }: CareerSectionProps) => {
  const [maximizedProject, setMaximizedProject] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (onModalToggle) {
      onModalToggle(maximizedProject !== null);
    }
  }, [maximizedProject, onModalToggle]);

  // Handle modal play state to prevent "stuck on loading" on mobile
  const [modalVideoPlaying, setModalVideoPlaying] = useState(false);
  const [showUnmuteWarning, setShowUnmuteWarning] = useState(false);

  useEffect(() => {
    if (maximizedProject !== null) {
      // Small delay to ensure modal is mounted and avoid interaction bit expiry issues
      const timer = setTimeout(() => {
        setModalVideoPlaying(true);
        setShowUnmuteWarning(true);
      }, 400);

      // Hide warning after 4 seconds
      const hideTimer = setTimeout(() => {
        setShowUnmuteWarning(false);
      }, 4500);

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    } else {
      setModalVideoPlaying(false);
      setShowUnmuteWarning(false);
    }
  }, [maximizedProject]);

  // Helper to extract Vimeo ID and thumbnail
  const getVimeoThumbnail = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    const id = match ? match[1] : null;
    return id ? `https://vumbnail.com/${id}.jpg` : "/placeholder.jpg";
  };

  // Helper to check if it's a Vimeo link
  const isVimeo = (url: string) => url.includes("vimeo.com");

  return (
    <section id="career" className="pt-8 pb-24 md:pt-16 md:pb-22 px-6 md:px-12 lg:px-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="mb-12 text-center md:text-left"
        >
          <p className="text-[12px] tracking-[0.3em] text-primary mb-2 font-accent uppercase">02 — CAREER SAGA</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">
            Selected <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl">
            A showcase of projects spanning video editing and motion design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl overflow-hidden border-glow bg-card/30 hover-glow flex flex-col cursor-pointer"
              onClick={() => {
                setMaximizedProject(i);
                setHoveredIndex(null); // Clear hover on click for mobile
              }}
              onMouseEnter={() => {
                if (maximizedProject === null) setHoveredIndex(i);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Video embed area */}
              <div className="aspect-video bg-muted/20 relative overflow-hidden group/video-card shrink-0">
                {/* 
                  PERFORMANCE OPTIMIZATION:
                  - Show a static placeholder while not hovering to avoid loading 12 video connections/iframes.
                  - For Vimeo, we'd ideally fetch a thumbnail from their API, but for now we'll use a local fallback or high-res image.
                */}
                <div className="absolute inset-0 z-0 bg-black/40 group-hover/video-card:bg-black/10 transition-colors duration-500" />

                {hoveredIndex === i ? (
                  isVimeo(project.video) ? (
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                      <ReactPlayer
                        src={project.video}
                        playing={true}
                        muted={true}
                        loop={true}
                        playsInline={true}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
                        config={{
                          vimeo: {
                            background: true,
                            transparent: false,
                            dnt: true,
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <video
                      src={`${project.video}#t=0.5`}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 blur-[0px] group-hover/video-card:blur-0 scale-100 group-hover/video-card:scale-105"
                      preload="metadata"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  )
                ) : (
                  // Static Thumbnail view (Fallback to metadata frame if no image)
                  // Static Thumbnail view (Fallback to vumbnail for vimeo or local thumbnail)
                  <img
                    src={isVimeo(project.video) ? getVimeoThumbnail(project.video) : project.thumbnail}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[40%] group-hover/video-card:opacity-100 group-hover/video-card:grayscale-0 transition-all duration-700"
                  />
                )}

                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer z-10 bg-gradient-to-t from-background/90 via-transparent to-transparent group-hover/video-card:from-background/40 transition-all duration-500"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-primary/40 flex items-center justify-center group-hover/video-card:border-primary group-hover/video-card:bg-primary/10 group-hover/video-card:scale-110 transition-all duration-300 backdrop-blur-sm">
                    <Play className="text-primary ml-1" size={28} />
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[9px] tracking-[0.20em] text-${project.color} font-bold uppercase`}>
                    {project.category}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl md:text-2xl mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <div className="space-y-4">
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-2 py-1">
                    {project.description}
                  </p>

                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[11px] text-primary font-bold uppercase tracking-widest mb-1 opacity-80">Key Impact</p>
                    <p className="text-xs md:text-[13px] text-foreground/90 leading-relaxed font-medium">
                      {project.keyRole}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Maximize Modal */}
      <AnimatePresence>
        {maximizedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 md:p-10"
            onClick={() => setMaximizedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`relative ${projects[maximizedProject].isVertical ? 'h-[90vh] aspect-[9/16]' : 'w-full max-w-6xl aspect-video'} bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(48,217,237,0.2)]`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full">
                <ReactPlayer
                  src={projects[maximizedProject].video}
                  playing={modalVideoPlaying}
                  controls={true}
                  playsInline={true}
                  muted={false} // Allow audio in modal since it's user-initiated
                  width="100%"
                  height="100%"
                  style={{ borderRadius: '1.5rem', overflow: 'hidden' }}
                  config={{
                    vimeo: {
                      autopause: false,
                      dnt: true,
                      color: "30D9ED",
                    }
                  }}
                  onReady={() => {
                    // Force play again on ready if needed
                    if (modalVideoPlaying) setModalVideoPlaying(true);
                  }}
                />
              </div>

              {/* Unmute Warning */}
              <AnimatePresence>
                {showUnmuteWarning && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute bottom-16 right-6 md:bottom-12 md:right-3 z-[110] bg-black/60 backdrop-blur-xl border border-primary/40 px-5 py-2.5 rounded-full pointer-events-none flex items-center gap-3 shadow-[0_0_30px_rgba(var(--primary),0.2)]"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Volume2 size={14} className="text-primary animate-pulse" />
                    </div>
                    <span className="text-[10px] md:text-xs text-white font-bold tracking-[0.15em] uppercase whitespace-nowrap">
                      Unmute for Audio
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Close Button */}
              <button
                onClick={() => setMaximizedProject(null)}
                className="absolute top-6 right-6 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white border border-white/10 hover:bg-primary hover:border-primary transition-all group active:scale-95 backdrop-blur-md"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Mobile Swipe-down indicator */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-white/20 md:hidden" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CareerSection;
