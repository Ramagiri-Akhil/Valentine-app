import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-pink-500 via-rose-400 to-purple-500 text-white">
      {/* Big Broken Heart Background */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ duration: 1 }}
        className="absolute text-[200px] md:text-[350px] select-none"
      >
        💔
      </motion.div>

      {/* Glass Content */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 px-10 py-12 rounded-3xl text-center shadow-2xl max-w-lg"
      >
        <h1 className="text-4xl font-bold mb-4">404 — Not Found</h1>

        <p className="opacity-80 mb-8 text-lg">
          You got lost, baby girl… 💔 But don’t worry — love always finds its
          way back.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-white/20 hover:bg-white/30 transition backdrop-blur-md rounded-full shadow-lg border border-white/30"
        >
          Take Me Back 💖
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;
