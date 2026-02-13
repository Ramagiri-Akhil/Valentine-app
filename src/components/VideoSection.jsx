import { motion } from "framer-motion";
import Video from "../assets/video1.mp4";
import { useRef, useState } from "react";

const VideoSection = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section  id="home" className="flex items-center justify-center min-h-screen px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-5xl w-full rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={Video}
          aria-label="Romantic video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-112.5 object-cover"
        />

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (!videoRef.current) return;

            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);

            videoRef.current.play();
          }}
          className="absolute bottom-4 right-4 z-20 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md text-sm"
        >
          {isMuted ? "🔇 Sound Off" : "🔊 Sound On"}
        </motion.button>

        <div className="absolute inset-0 bg-black/30 flex items-center pointer-events-none justify-center">
          <h2 className="text-white text-4xl md:text-5xl  tracking-wide">❤️</h2>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoSection;
