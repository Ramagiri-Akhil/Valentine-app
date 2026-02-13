import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import cardBack from "../assets/card.webp";
import cardFront from "../assets/OpenCard.webp";

/* ---------------- MESSAGE LINES ---------------- */

const messageLines = [
  "Renu, tum laxmi se adhik pyaari,",
  "Main dhool tumhare charnon ki",
  "Tum bagiche ki khushboo, main tumhari mitti",
  "Tum bano taaj sona ka,",
  "Main theek payal tumhare kadmon ki... 🧿💜",
];

/* ---------------- FLOATING HEARTS ---------------- */

const heartsConfig = Array.from({ length: 10 }).map(() => ({
  x: Math.random() * 200 - 100,
  scale: Math.random() * 0.6 + 0.4,
  duration: Math.random() * 2 + 3,
  delay: Math.random() * 2,
}));

const FloatingHearts = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {heartsConfig.map((heart, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, x: heart.x, scale: heart.scale }}
          animate={{ opacity: [0, 1, 0], y: -300 }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeOut",
          }}
          className="absolute bottom-10 left-1/2 text-pink-400 text-2xl"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

const MemoryCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  return (
    <section
      id="message"
      className="min-h-screen flex flex-col items-center justify-center px-6 relative"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="edu-nsw-act-cursive-regular mb-16 text-4xl font-semibold tracking-wide
             text-white backdrop-blur-xl"
      >
        Message for Renu..
      </motion.h2>
      <div className="relative">
        {showHearts && <FloatingHearts />}

        {/* ---------------- CARD ---------------- */}
        <motion.div
          className="relative w-[320px] h-105 cursor-pointer"
          animate={{ rotateY: isOpen ? 180 : 0 }}
          whileHover={{ y: -10, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const newState = !isOpen;
            setIsOpen(newState);
            setShowHearts(newState);
          }}
          transition={{ duration: 0.4 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              boxShadow:
                "0 0 30px rgba(255,100,180,0.4), 0 0 60px rgba(180,80,255,0.3)",
            }}
          />

          {/* FRONT */}
          <div className="absolute inset-0 backface-hidden">
            <img
              src={cardFront}
              loading="lazy"
              alt="Valentine card"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h2 className="cedarville-cursive-regular text-xl font-bold text-purple-900">
                Happy Valentine’s Day Renu 💜
              </h2>
              <p className="mt-2 text-sm font-semibold text-purple-800 opacity-80">
                Tap me to receive a cute message
              </p>
            </div>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <img
              src={cardBack}
              loading="lazy"
              alt="Open card"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />

            <div className="absolute inset-0 flex items-center justify-center px-6">
              <div className="text-center space-y-2">
                <AnimatePresence>
                  {isOpen &&
                    messageLines.map((line, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.4,
                        }}
                        className="text-violet-300 text-lg font-semibold edu-nsw-act-cursive-regular "
                      >
                        {line}
                      </motion.p>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MemoryCard;
