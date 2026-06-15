import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-32 relative flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-4xl"
      >
        {/* Cinematic Glow Behind Card */}
        <div className="absolute -inset-4 bg-gradient-to-r from-glow-crimson via-glow-purple to-glow-amber opacity-30 blur-2xl rounded-3xl z-0"></div>
        
        <div className="relative z-10 glass-card p-12 md:p-20 text-center rounded-3xl overflow-hidden">
          {/* Internal Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            Ready For Your Next Movie Night?
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
            Join thousands of movie lovers who have upgraded their cinematic experience. Book your perfect seat in seconds.
          </p>
          
          <button className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Book Your Seat
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
