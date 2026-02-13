import React, { useState } from "react";
import { delay, motion, spring, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import doodle from "../assets/doodle.png"
import doodleAngry from "../assets/AngryDoodle.png"
import doodleHappy from "../assets/HappyDoodle.png"
import {useRef} from "react";


const Proposal = () => {
  const navigate = useNavigate();
  const [noposition, setNoposition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [celebrate, setCelebrate] = useState(false);
  const [doodleState, setDoodleState] = useState("normal");
  const [mousepos, setMousepos] = useState({ x: 0, y: 0 });

const noBtnRef = useRef(null);



  const HEART_COLORS = [
    "#ff4d6d",
    "#F72585",
    "#C77DFF",
    "#9D4EDD",
    "#7B2CBF",
    "#FFFFFF",
    "#f29aae",
    "#c47be4",
    "#a865dd",
    "#7132ca",
    "#4b25b8",
    "#301ca0",
  ];
  const moveNObutton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoposition({ x, y });
  };

  const handleYes = () => {
    const particles = Array.from({ length: 40 }).map((_, i) => {
      const t = (Math.PI * 2 * i) / 40;

      const x = 16 * Math.pow(Math.sin(t), 3);

      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      return {
        x: x * 15,
        y: -y * 15,
        size: Math.random() * 5 + 4,
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        delay: Math.random() * 0.3,
      };
    });

    setParticles(particles);
      setCelebrate(true);
      setDoodleState("happy");
    setTimeout(() => {
      navigate("/love");
    }, 2200);
  };
  const getDoodleImage = () => {
    if (doodleState === "angry") return doodleAngry;
    if (doodleState === "happy") return doodleHappy;
    return doodle;
  };

const handleMouseMove = (e) => {
  if (!noBtnRef.current) return;

  const btnRect = noBtnRef.current.getBoundingClientRect();

  const btnX = btnRect.left + btnRect.width / 2;
  const btnY = btnRect.top + btnRect.height / 2;

  const dx = e.clientX - btnX;
  const dy = e.clientY - btnY;

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 120 ) {
    setDoodleState("angry");
  } else {
    setDoodleState("normal");
  }
};


  return (
    <div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5 ,ease: "easeInOut"}}
      className="h-screen flex items-center relative justify-center">
      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 5, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute w-10 h-10 bg-white rounded-full shadow-[0_0_90px_rgba(255,255,255,1)]"
            />

            {particles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  scale: 1,
                  opacity: 0,
                }}
                transition={{
                  duration: 2,
                  delay: p.delay,
                  ease: "easeOut",
                }}
                className="absolute"
              >
                {/* Glow */}
                <div
                  style={{
                    width: p.size * 3,
                    height: p.size * 3,
                    backgroundColor: p.color,
                  }}
                  className="absolute rounded-full blur-xl opacity-70"
                />

                {/* Core */}
                <div
                  style={{
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                  }}
                  className="absolute rounded-full shadow-[0_0_25px_currentColor]"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/20 backdrop-blur-xl p-10 rounded-2xl shadow-2xl text-center z-10"
      >
        <h1 className="font-semibold text-2xl text-white">
          Will you be my valentine?
        </h1>
        <AnimatePresence mode="wait">
          <motion.img
            loading="lazy"
            key={doodleState}
            src={getDoodleImage()}
            alt="cute doodle"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-40 mx-auto mb-6 select-none"
          />
        </AnimatePresence>

        <div className="flex justify-around">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYes}
            className="bg-white/70 px-6 py-3 text-softRed rounded-full shadow-lg"
          >
            Yes
          </motion.button>
          <motion.button
            ref={noBtnRef}
            onMouseEnter={moveNObutton}
            animate={noposition}
            transition={{ type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/70 px-6 py-3 text-softRed rounded-full shadow-lg"
          >
            No
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Proposal;
