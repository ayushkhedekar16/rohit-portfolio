import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import resumePdf from "../assets/rohit_resume.pdf";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "CAREER", href: "#career" },
  { label: "ACADEMIA", href: "#academia" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "ABILITIES", href: "#abilities" },
  { label: "CONTACT", href: "#contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Active section detection
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Watch the upper portion of the screen
      threshold: [0, 0.1],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Function to start observing elements
    const observeElements = () => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.href.substring(1));
        if (element) {
          observer.observe(element);
        }
      });
    };

    // Initial attempt
    observeElements();

    // Since sections are lazy-loaded, they might not be in DOM immediately.
    // We'll poll a few times or use a timeout as a simple fix for lazy load.
    const retryInterval = setInterval(observeElements, 1000);
    const timeout = setTimeout(() => clearInterval(retryInterval), 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      clearInterval(retryInterval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "py-5 bg-transparent"
        }`}
    >
      <div className="w-full px-2 md:px-18 flex items-center justify-between">
        <a href="#home" className="text-xl font-display font-bold tracking-wider text-gradient">
          PORTFOLIO
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveSection(item.href.substring(1))}
                className={`text-[10px] font-medium tracking-[0.2em] transition-colors duration-300 relative font-accent after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 ${isActive
                  ? "text-primary after:w-full drop-shadow-[0_0_8px_rgba(48,217,237,0.5)]"
                  : "text-muted-foreground/90 hover:text-primary after:w-0 hover:after:w-full"
                  }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href={resumePdf}
            download="Resume.pdf"
            className="flex items-center gap-2 px-5 py-2 text-xs font-medium tracking-[0.15em] border border-primary/30 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-primary"
          >
            <Download size={14} />
            RESUME
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-foreground p-2"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass mt-2 mx-4 rounded-lg overflow-hidden"
          >
            <div className="flex flex-col items-center py-6 gap-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setIsOpen(false);
                      setActiveSection(item.href.substring(1));
                    }}
                    className={`text-xs tracking-[0.4em] transition-colors font-accent ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                      }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <a
                href={resumePdf}
                download="Resume.pdf"
                className="flex items-center gap-2 px-5 py-2 text-xs tracking-[0.15em] border border-primary/30 text-primary rounded-full"
              >
                <Download size={14} />
                RESUME
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
