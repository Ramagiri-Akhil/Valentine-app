import { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('home')

const scrollTo = (id) => {
  const section = document.getElementById(id);

  if (section) {
    const yOffset = -80; // navbar height offset
    const y =
      section.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setOpen(false);
  }
};

    
  useEffect(() => {
    const sections = ["home", "gallery", "message"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3, // 60% visible
      },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left */}
        <div
          onClick={() => scrollTo("home")}
          className={`playwrite-cu-guides-regular text-xl font-semibold cursor-pointer transition hover:text-pink-300 ${
            active === "home" ? "text-pink-300 scale-110" : "text-white"
          }`}
        >
          Love You 💗
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-white text-lg">
          <button
            onClick={() => scrollTo("gallery")}
            className={`playwrite-cu-guides-regular cursor-pointer transition ${
              active === "gallery"
                ? "text-pink-300 scale-110"
                : "text-white hover:text-pink-200"
            }`}
          >
            Gallery ✨
          </button>

          <button
            onClick={() => scrollTo("message")}
            className={`playwrite-cu-guides-regular cursor-pointer hover:text-pink-300 transition ${
              active === "message" ? "text-pink-300 scale-110" : "text-white"
            }`}
          >
            Message 💌
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div
          className=" md:hidden cursor-pointer space-y-1 "
          onClick={() => setOpen(!open)}
        >
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            aria-label="Open menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/20"
          >
            <div className="playwrite-cu-guides-regular flex flex-col items-center py-6 gap-6 text-white text-lg">
              <button onClick={() => scrollTo("gallery")}>Gallery ✨</button>

              <button onClick={() => scrollTo("message")}>Message 💌</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
