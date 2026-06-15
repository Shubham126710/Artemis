import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How do I book tickets on SilverSeat?",
    answer: "Booking tickets is easy! Simply browse our trending movies, select a showtime that works for you, choose your preferred seats on our interactive map, and proceed to checkout. You'll receive a digital ticket instantly."
  },
  {
    question: "Can I cancel or change my booking?",
    answer: "Absolutely! You can cancel or modify your booking up to 2 hours before the showtime directly from your account dashboard. Refunds are processed automatically to your original payment method."
  },
  {
    question: "Do you offer premium seating options?",
    answer: "Yes, we partner with top theatres to offer premium experiences including VIP recliners, IMAX, Dolby Cinema, and exclusive lounge access where available."
  },
  {
    question: "How do I use promo codes or gift cards?",
    answer: "During checkout, you will see an option to 'Add Promo Code or Gift Card' right before payment. Simply enter your code there, and the total amount will be updated automatically."
  },
  {
    question: "Is there a loyalty program?",
    answer: "Yes! With SilverSeat Rewards, you earn points on every purchase which can be redeemed for free tickets, concessions, and exclusive premiere access."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(1); // Second item open by default like screenshot

  return (
    <section className="py-24 bg-bg-base">
      <div className="max-w-[700px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
          Answers to your questions
        </h2>

        <div className="space-y-3 mb-12">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-[#0B0B0B] border border-white/5 rounded-xl overflow-hidden transition-colors hover:border-white/10"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="font-medium text-white/90">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111111] hover:bg-[#1a1a1a] border border-white/10 rounded-full text-xs font-medium text-gray-300 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Message us if you have more
          </button>
          <a href="mailto:hello@silverseat.com" className="text-xs text-gray-500 hover:text-white transition-colors">
            hello@silverseat.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
