import Link from 'next/link';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] max-w-6xl z-50"
    >
      <div className="glass px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-full">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <img src="/logo.png" alt="SilverSeat" className="h-8 w-auto object-contain" />
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#movies" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Movies</a>
          <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#architecture" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Architecture</a>
          <a href="#stats" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Stats</a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">
            Log In
          </Link>
          <Link href="/login" className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 hover:scale-105 transition-all">
            Sign Up
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
