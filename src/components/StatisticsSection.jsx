import { motion } from 'framer-motion';

const stats = [
  { value: "500K+", label: "Tickets Booked" },
  { value: "50+", label: "Partner Theatres" },
  { value: "99.9%", label: "Booking Reliability" },
  { value: "1M+", label: "Monthly Visitors" }
];

const StatisticsSection = () => {
  return (
    <section id="stats" className="py-20 border-y border-white/5 bg-bg-elevated/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center space-y-2"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
                {stat.value}
              </h3>
              <p className="text-sm md:text-base font-medium text-gray-400 tracking-wide uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
