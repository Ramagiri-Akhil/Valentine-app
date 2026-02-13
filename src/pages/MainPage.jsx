import { motion } from 'framer-motion'
import VideoSection from '../components/VideoSection';
import MemoryCard from '../components/MemoryCard';
import Gallery from '../components/Gallery';
import Navbar from '../components/Navbar';

const MainPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center ">
            <div className="marquee">
              <div className="marquee-track">
                <span>HAPPY VALENTINE’S DAY !</span>
                <span>HAPPY VALENTINE’S DAY !</span>
                <span>HAPPY VALENTINE’S DAY !</span>
                <span>HAPPY VALENTINE’S DAY !</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10">
          <Navbar/>
          <VideoSection />
        </div>
      </div>
      <Gallery />
      <MemoryCard />
    </motion.div>
  );
}

export default MainPage