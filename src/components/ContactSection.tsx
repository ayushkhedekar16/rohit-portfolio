import { memo } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Instagram, Linkedin, ArrowUpRight } from "lucide-react";

const ContactSection = memo(() => {
  const contactInfo = [
    {
      icon: Mail,
      text: "rohityadav3042@gmail.com",
      label: "Email",
      href: "mailto:rohityadav3042@gmail.com",
      description: "Send me a message anytime"
    },
    {
      icon: Phone,
      text: "+91 93596 33669",
      label: "Phone",
      href: "tel:+919359633669",
      description: "Mon - Fri, 9am - 6pm"
    },
    {
      icon: MapPin,
      text: "Pune, Maharashtra, India",
      label: "Location",
      href: "https://maps.google.com/?q=Pune,Maharashtra,India",
      description: "Let's connect in person"
    },
  ];

  return (
    <section id="contact" className="pt-24 pb-32 px-6 md:px-12 lg:px-20 relative overflow-hidden scroll-mt-20">
      {/* Decorative Background Elements - Optimized with lower blur and opacity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px] pointer-events-none -z-10 will-change-[filter]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[60px] pointer-events-none -z-10 will-change-[filter]" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center will-change-transform"
        >
          <p className="text-[12px] tracking-[0.3em] text-primary mb-2 font-accent uppercase">06 — CONTACT</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-muted-foreground text-lg mt-5 max-w-2xl mx-auto leading-relaxed"
          >
            Ready to bring your vision to life? Whether it's a film, commercial, or digital content — I'm just a message away.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group p-[1px] rounded-3xl md:rounded-[2.5rem] bg-gradient-to-b from-primary/20 via-border/40 to-secondary/20 overflow-hidden shadow-2xl"
          >
            {/* Inner Content Container - Reduced backdrop-blur for performance */}
            <div className="relative z-10 bg-background/90 backdrop-blur-lg rounded-3xl md:rounded-[2.5rem] p-6s md:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">

                {/* Contact List */}
                <div className="lg:pr-6 space-y-8">

                  <div className="space-y-1">
                    {contactInfo.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 group/item"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500">
                            <item.icon size={20} />
                          </div>
                          <div className="space-y-0.5 overflow-hidden">
                            <p className="text-[10px] tracking-widest text-accent font-bold uppercase">{item.label}</p>
                            <p className="text-sm md:text-base font-medium text-foreground group-hover/item:text-primary transition-colors truncate">{item.text}</p>
                          </div>
                        </div>

                        {/* Redirect Icon - Only visible on hover */}
                        <div className="opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0 translate-x-4 transition-all duration-300 pr-2">
                          <ArrowUpRight size={18} className="text-primary" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Social & CTA Area */}
                <div className="lg:border-l border-border/50 lg:pl-6 flex flex-col items-center text-center space-y-10">
                  <div className="space-y-4">
                    <p className="text-[14px] tracking-[0.1em] text-primary font-bold uppercase font-accent">
                      CONNECT ON FREQUENCIES
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {[
                        { icon: Linkedin, href: "https://www.linkedin.com/in/rohit-yadav-51a566251?", label: "LinkedIn" },
                        { icon: Instagram, href: "https://www.instagram.com/_rohittt_49?", label: "Instagram" },
                      ].map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-6 py-3 rounded-full bg-muted/30 border border-border/50 hover:border-primary/50 transition-all duration-500"
                        >
                          <social.icon size={18} className="text-primary" />
                          <span className="text-xs font-semibold">{social.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="w-full max-w-sm pt-1">
                    <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
                      <p className="text-sm italic text-muted-foreground leading-relaxed">
                        "Your creativity is the real special effect."
                      </p>
                      <div className="h-px w-20 bg-primary/30 mx-auto" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Decorative background glow - Optimized */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-secondary/10 rounded-full blur-[60px] pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-14 px-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border/30 to-transparent" />
        <div className="pt-8 flex flex-col md:flex-row justify-center items-center gap-6 text-muted-foreground/60 text-[10px] tracking-[0.2em] uppercase font-accent">
          <p>© {new Date().getFullYear()} ROHIT YADAV — EST. 2024</p>
        </div>
      </div>
    </section>
  );
});

export default ContactSection;
