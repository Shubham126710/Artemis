import { motion } from 'framer-motion';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-bg-base">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Everything You Need for<br />Smarter Booking
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0f0f0f] border border-white/5 rounded-[24px] p-8 flex flex-col hover:border-white/10 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">Lightning Fast</h3>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
              Book faster with optimized microservices. Never miss out on a premiere again.
            </p>
            {/* Abstract visual placeholder */}
            <div className="mt-auto h-32 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 relative overflow-hidden flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-glow-amber/20 blur-xl"></div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#0f0f0f] border border-white/5 rounded-[24px] p-8 flex flex-col hover:border-white/10 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">Real-Time Seat Locks</h3>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
              Select seats instantly. Redis-powered locking ensures your pick is guaranteed.
            </p>
            {/* Abstract visual placeholder */}
            <div className="mt-auto h-32 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 relative overflow-hidden flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[#222]"></div>
              <div className="w-8 h-8 rounded-md bg-glow-crimson/80 border border-glow-crimson flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white"></div></div>
              <div className="w-8 h-8 rounded-md bg-[#222]"></div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#0f0f0f] border border-white/5 rounded-[24px] p-8 flex flex-col hover:border-white/10 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">Digital Tickets</h3>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
              Your phone is your ticket. Instant QR codes securely sent to your device.
            </p>
            {/* Abstract visual placeholder */}
            <div className="mt-auto h-32 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 relative overflow-hidden flex items-center justify-center">
              <div className="w-20 h-20 bg-white/10 rounded-lg p-2 flex flex-wrap gap-1">
                {[...Array(16)].map((_, i) => <div key={i} className="w-[18%] h-[18%] bg-white/20 rounded-sm"></div>)}
              </div>
            </div>
          </motion.div>

          {/* Card 4 - Wide */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-[#0f0f0f] border border-white/5 rounded-[24px] p-8 flex flex-col md:flex-row gap-8 hover:border-white/10 transition-colors overflow-hidden"
          >
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-2 text-white">Works With Your Tools</h3>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                Connect seamlessly with Apple Wallet, Google Calendar, and split the bill with friends via integrated payment sharing.
              </p>
            </div>
            {/* Abstract visual placeholder */}
            <div className="flex-1 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl border border-white/5 relative h-40 md:h-auto min-h-[160px] flex flex-col justify-center px-6">
              <div className="space-y-3">
                <div className="h-8 bg-white/5 rounded-md w-3/4 flex items-center px-3 gap-2"><div className="w-4 h-4 rounded-full bg-[#1da1f2]"></div><div className="h-2 w-16 bg-white/10 rounded"></div></div>
                <div className="h-8 bg-white/10 rounded-md w-full flex items-center px-3 gap-2 border border-white/5"><div className="w-4 h-4 rounded-full bg-white"></div><div className="h-2 w-20 bg-white/30 rounded"></div></div>
                <div className="h-8 bg-white/5 rounded-md w-5/6 flex items-center px-3 gap-2"><div className="w-4 h-4 rounded-full bg-[#ea4335]"></div><div className="h-2 w-12 bg-white/10 rounded"></div></div>
              </div>
            </div>
          </motion.div>

          {/* Card 5 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-1 bg-[#0f0f0f] border border-white/5 rounded-[24px] p-8 flex flex-col hover:border-white/10 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">Premium Experiences</h3>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
              Unlock VIP lounges, IMAX, and exclusive premieres with SilverSeat Elite.
            </p>
            {/* Abstract visual placeholder */}
            <div className="mt-auto h-40 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 relative overflow-hidden flex items-end justify-center">
              <div className="w-full flex items-end gap-1 px-4 opacity-50">
                <div className="flex-1 bg-gradient-to-t from-glow-purple to-transparent h-12 rounded-t-sm"></div>
                <div className="flex-1 bg-gradient-to-t from-glow-purple to-transparent h-20 rounded-t-sm"></div>
                <div className="flex-1 bg-gradient-to-t from-glow-purple to-transparent h-16 rounded-t-sm"></div>
                <div className="flex-1 bg-gradient-to-t from-glow-purple to-transparent h-24 rounded-t-sm"></div>
                <div className="flex-1 bg-gradient-to-t from-glow-purple to-transparent h-10 rounded-t-sm"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
