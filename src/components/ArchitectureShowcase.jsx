import { motion } from 'framer-motion';
import { Server, Shield, Film, Calendar, Ticket, CreditCard, Bell } from 'lucide-react';

const ArchitectureShowcase = () => {
  return (
    <section id="architecture" className="py-24 relative overflow-hidden bg-bg-base">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bg-highlight/50 via-bg-base to-bg-base pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <div className="mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Enterprise-Grade Architecture</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Built on a scalable, resilient microservices foundation designed to handle millions of concurrent bookings flawlessly.</p>
        </div>

        <div className="relative max-w-4xl mx-auto mt-20">
          
          {/* API Gateway - Top Level */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="glass-card px-8 py-5 flex items-center gap-4 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-glow-amber to-glow-crimson opacity-20 group-hover:opacity-40 blur rounded-2xl transition-opacity"></div>
              <Server className="w-8 h-8 text-glow-amber relative z-10" />
              <span className="text-xl font-bold text-white relative z-10">API Gateway</span>
              
              {/* Connection Lines downward */}
              <div className="hidden md:block absolute -bottom-12 left-1/2 w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
            </div>
          </motion.div>

          {/* Microservices - Bottom Level Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative">
            {/* Horizontal Connection Line */}
            <div className="hidden md:block absolute -top-6 left-[16%] right-[16%] h-[1px] bg-white/10"></div>
            
            {[
              { icon: Shield, name: "Auth Service", delay: 0.1 },
              { icon: Film, name: "Movie Catalog", delay: 0.2 },
              { icon: Calendar, name: "Show Service", delay: 0.3 },
              { icon: Ticket, name: "Booking Service", delay: 0.4 },
              { icon: CreditCard, name: "Payment Service", delay: 0.5 },
              { icon: Bell, name: "Notification Service", delay: 0.6 }
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: service.delay, duration: 0.5 }}
                  className="glass p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform relative"
                >
                  <div className="hidden md:block absolute -top-6 left-1/2 w-[1px] h-6 bg-gradient-to-b from-white/10 to-transparent"></div>
                  <Icon className="w-6 h-6 text-gray-300" />
                  <span className="text-sm font-semibold text-gray-200">{service.name}</span>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArchitectureShowcase;
