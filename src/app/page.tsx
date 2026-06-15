"use client";

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SocialProofCarousel from '../components/SocialProofCarousel';
import FeaturedMovies from '../components/FeaturedMovies';
import FeaturesSection from '../components/FeaturesSection';
import ArchitectureShowcase from '../components/ArchitectureShowcase';
import StatisticsSection from '../components/StatisticsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader for 3.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader setLoading={setLoading} />}
      </AnimatePresence>

      <Navbar />
      <main className={loading ? 'h-screen overflow-hidden' : ''}>
        <HeroSection />
        <SocialProofCarousel />
        <FeaturedMovies />
        <FeaturesSection />
        <ArchitectureShowcase />
        <StatisticsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
