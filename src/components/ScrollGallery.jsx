import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import MemoryCard from "./Message";

const photos = [
    {
        date: "2019-08-15",
        src: photo1,
    },
    {
        date: "2020-02-14",
        src: photo2,
    },
    {
        date: "2021-12-25",
        src: photo3,
    },
];

const PhotoSlide = ({ photo, index, scrollYProgress }) => {
  const start = 0.3 + index * 0.2;
  const end = start + 0.15;

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.9, 1]);

  return (
    <motion.div style={{ opacity, scale }} className="absolute">
      <img
        src={photo.src}
        alt={photo.date}
        className="w-87.5 h-105 object-cover rounded-2xl shadow-2xl"
      />
      <div className="mt-3 text-center text-white text-lg">{photo.date}</div>
    </motion.div>
  );
};


const ScrollGallery = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Card moves left
  const cardX = useTransform(scrollYProgress, [0, 0.3], ["0%", "-40%"]);

  // Timeline grows
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* MESSAGE CARD */}
        <motion.div style={{ x: cardX }} className="z-20">
          <MemoryCard />
        </motion.div>

        {/* PHOTO AREA */}
        <div className="absolute right-32 h-105 w-[320px] flex items-center justify-center">
          {photos.map((photo, index) => (
            <PhotoSlide
              key={index}
              photo={photo}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* TIMELINE LINE */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 h-75 w-0.5 bg-white/20">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-pink-400 origin-top"
          />
        </div>
      </div>
    </section>
  );
};

export default ScrollGallery;
