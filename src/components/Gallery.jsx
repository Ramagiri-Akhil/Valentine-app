import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import photo1 from "../assets/photo1.webp";
import photo2 from "../assets/photo2.webp";
import photo3 from "../assets/photo3.webp";
import photo4 from "../assets/photo4.webp";
import photo5 from "../assets/photo5.webp";
import photo6 from "../assets/photo6.webp";
import photo7 from "../assets/photo7.webp";
import photo8 from "../assets/photo8.webp";
import photo9 from "../assets/photo9.webp";

const images = [photo1, photo2, photo3, photo4,photo5, photo6, photo7, photo8, photo9 ];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const [particles] = useState(() =>
    Array.from({ length: 8 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 6,
    })),
  );

  return (
    <section id="gallery" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 -z-10  bg-size-[200%_200%]"
      />

      {/* Heading ABOVE the gallery */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="playwrite-cu-guides-regular mb-16 text-4xl font-semibold tracking-wide
             text-white backdrop-blur-xl"
      >
        Memories
      </motion.h2>

      {/* Gallery Container */}
      <div className="relative w-full max-w-6xl h-125 flex items-center justify-center perspective-distant">
        {images.map((img, index) => {
          const offset = (index - currentIndex + images.length) % images.length;

          let position = offset;
          if (offset > images.length / 2) {
            position = offset - images.length;
          }

          return (
            <motion.div
              key={index}
              className="absolute"
              animate={{
                x: position * 360,
                scale: position === 0 ? 1.1 : 0.85,
                opacity: position === 0 ? 1 : 0.5,
                rotateY: position * -15,
                zIndex: position === 0 ? 10 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
            >
              {position === 0 && (
                <div className="absolute w-95 h-125 bg-pink-300/30 blur-3xl rounded-full -z-10" />
              )}

              <motion.img
                loading="lazy"
                alt="Memory's from our journey"
                src={img}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -50) next();
                  if (info.offset.x > 50) prev();
                }}
                whileHover={position === 0 ? { rotate: 1.5, scale: 1.12 } : {}}
                className="w-[320px] h-112.5 object-cover rounded-3xl shadow-2xl"
              />
            </motion.div>
          );
        })}

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-0 z-20 bg-white/60 px-4 py-2 rounded-full backdrop-blur-md shadow-md"
        >
          ←
        </button>

        <button
          onClick={next}
          className="absolute right-0 z-20 bg-white/60 px-4 py-2 rounded-full backdrop-blur-md shadow-md"
        >
          →
        </button>
      </div>

      {/* Pagination */}
      <div className="mt-10 flex gap-3">
        {images.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === currentIndex ? 1.4 : 1,
              opacity: i === currentIndex ? 1 : 0.5,
            }}
            className="w-3 h-3 bg-white rounded-full"
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
