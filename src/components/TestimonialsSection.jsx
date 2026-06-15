import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    text: "As a frequent moviegoer, I need to book tickets on the go. This app has simplified the process for me. It's fast, reliable, and the seat selection is unbeatable.",
    author: "Sophia Johnson",
    role: "Movie Enthusiast",
    rating: 5,
  },
  {
    text: "Running a film club, I need to buy bulk tickets that are easy to manage and cost-effective. This platform ticks all the boxes. It's saved me time and money!",
    author: "Emily Chen",
    role: "Club Organizer",
    rating: 5,
  },
  {
    text: "As a travel blogger, I'm constantly on the go. This app has made it so easy for me to catch the latest releases from anywhere in the world!",
    author: "Jessica Thompson",
    role: "Blogger",
    rating: 5,
  },
  {
    text: "Being a freelancer, I rely on this app to plan my weekend getaways. It's convenient, secure, and the transaction history feature helps me keep track of all my entertainment expenses.",
    author: "Alex Ramirez",
    role: "Designer",
    rating: 5,
  },
  {
    text: "I've tried several other booking apps, but none compare to this one. The user interface is intuitive, and the ability to seamlessly use multiple payment options is a game-changer.",
    author: "David Patel",
    role: "Software Engineer",
    rating: 5,
  },
  {
    text: "I've been using this app to organize movie nights for my family, and I couldn't be happier. The transactions are seamless, and the fees are much lower compared to other platforms. Highly recommended!",
    author: "Michael Davis",
    role: "Business Owner",
    rating: 5,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-bg-base relative">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 mb-6">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Reviews from 1000+<br/>customers
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover what our users have to say about their experience with our platform.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="bg-[#111111] border border-white/5 rounded-2xl p-8 flex flex-col hover:border-white/10 transition-colors"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-white text-white" />
                ))}
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-grow">
                "{testimonial.text}"
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="text-sm">
                  <span className="text-white font-medium">{testimonial.author}</span>
                  <span className="text-gray-600 mx-2">|</span>
                  <span className="text-gray-500">{testimonial.role}</span>
                </div>
                {/* Simple X logo SVG */}
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-500 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
