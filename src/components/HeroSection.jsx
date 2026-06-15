import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Background Wallpaper */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/hero.jpg')` }}
        ></div>
        {/* Subtle fade at the bottom to transition into the next black section smoothly */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-base to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
            <span className="text-sm font-medium text-gray-300">Trusted by movie lovers nationwide</span>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        >
          Book Movie Tickets<br />
          <span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 italic font-light lowercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            the premium way
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Discover the latest blockbusters, reserve your seats in seconds, and enjoy a seamless movie-going experience powered by modern technology.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] text-center">
            Book Tickets
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full glass font-semibold hover:bg-white/10 hover:scale-105 transition-all">
            Explore Movies
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
