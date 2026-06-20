"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Heart, ThumbsDown, ChevronLeft } from "lucide-react";
import { Movie } from "@/lib/data";
import { FastAverageColor } from "fast-average-color";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const FALLBACK_MOVIES: any[] = [
  { id: "fb1", title: "Dune: Part Two", image: "/Dune_part2_movie.jpg", tags: ["Action", "Sci-Fi", "Adventure", "Western", "War"], releaseYear: 2024 },
  { id: "fb2", title: "Oppenheimer", image: "/Oppenheimer_Movie-.jpeg", tags: ["Biography", "Drama", "History", "Documentary"], releaseYear: 2023 },
  { id: "fb3", title: "Project Hail Mary", image: "/Project_Hail_Mary_movie.jpg", tags: ["Sci-Fi", "Adventure", "Thriller"], releaseYear: 2026 },
  { id: "fb4", title: "F1", image: "/F1_movie.jpg", tags: ["Sports", "Drama"], releaseYear: 2025 },
  { id: "fb5", title: "Barbie", image: "/barbie_movie.jpeg", tags: ["Comedy", "Fantasy", "Romance", "Music"], releaseYear: 2023 },
  { id: "fb6", title: "Super Mario Galaxy", image: "/super_mario_galaxy_movie.jpeg", tags: ["Animation", "Family"], releaseYear: 2025 },
  { id: "fb7", title: "Superman", image: "/superman_movie.jpeg", tags: ["Action", "Sci-Fi"], releaseYear: 2025 },
  { id: "fb8", title: "Obsession", image: "/obsession_movie.jpg", tags: ["Thriller", "Mystery", "Crime", "Horror"], releaseYear: 2024 }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);
  
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [likedMovies, setLikedMovies] = useState<string[]>([]);
  const [dislikedMovies, setDislikedMovies] = useState<string[]>([]);

  const [swipeMovies, setSwipeMovies] = useState<any[]>([]);
  const [isFetchingRecommendations, setIsFetchingRecommendations] = useState(false);

  const genresList = [
    "Action", "Adventure", "Animation", "Biography", "Comedy",
    "Crime", "Documentary", "Drama", "Family", "Fantasy",
    "History", "Horror", "Music", "Mystery", "Romance",
    "Sci-Fi", "Sports", "Thriller", "War", "Western"
  ];

  const proceedToStep2 = async () => {
    setIsFetchingRecommendations(true);
    // Save genres immediately so they aren't lost if the user bails out of swiping
    localStorage.setItem('silverSeat_genres', JSON.stringify(selectedGenres));
    
    try {
      const res = await fetch(`/api/movies/onboarding?genres=${encodeURIComponent(selectedGenres.join(","))}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setSwipeMovies(data);
      } else {
        // Ultimate safety net
        setSwipeMovies([...FALLBACK_MOVIES].sort(() => Math.random() - 0.5));
      }
    } catch (e) {
      setSwipeMovies([...FALLBACK_MOVIES].sort(() => Math.random() - 0.5));
    } finally {
      setIsFetchingRecommendations(false);
      setStep(2);
    }
  };

  const currentSwipeIndex = likedMovies.length + dislikedMovies.length;
  const currentMovie = swipeMovies[currentSwipeIndex];

  const toggleGenre = (g: string) => {
    setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };

  const handleSwipe = (action: 'like' | 'dislike') => {
    if (!currentMovie) return;
    
    if (action === 'like') setLikedMovies(prev => [...prev, currentMovie.id]);
    if (action === 'dislike') setDislikedMovies(prev => [...prev, currentMovie.id]);
    
    if (currentSwipeIndex + 1 >= Math.min(swipeMovies.length, 10)) { // limit to 10 swipes
      finishOnboarding(action === 'like' ? [...likedMovies, currentMovie.id] : likedMovies);
    }
  };

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      handleSwipe('like');
    } else if (info.offset.x < -threshold) {
      handleSwipe('dislike');
    }
  };

  const [dominantColor, setDominantColor] = useState<string | null>(null);

  useEffect(() => {
    if (step === 2 && currentMovie && currentMovie.image) {
      const fac = new FastAverageColor();
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = currentMovie.image.startsWith('http') 
        ? `/api/proxy-image?url=${encodeURIComponent(currentMovie.image)}` 
        : currentMovie.image;
      img.onload = () => {
        try {
          const color = fac.getColor(img);
          setDominantColor(color.hex);
        } catch (e) {
          console.error(e);
          setDominantColor(null);
        }
      };
    } else {
      setDominantColor(null);
    }
  }, [step, currentMovie]);

  const finishOnboarding = (finalLikes: string[]) => {
    localStorage.setItem('silverSeat_genres', JSON.stringify(selectedGenres));
    localStorage.setItem('silverSeat_likes', JSON.stringify(finalLikes));
    router.push("/dashboard");
  };

  // Auto-redirect if they reach the empty state
  useEffect(() => {
    if (step === 2 && !currentMovie) {
      const timer = setTimeout(() => {
        finishOnboarding(likedMovies);
      }, 1500); // Give them 1.5s to see the "All Set!" message
      return () => clearTimeout(timer);
    }
  }, [step, currentMovie]);

  return (
    <div className="min-h-screen bg-bg-base text-gray-100 font-sans relative overflow-hidden flex items-center justify-center p-4">
      {/* Glowing Background */}
      <div className="absolute inset-0 z-0 transition-colors duration-1000" style={{
        backgroundColor: dominantColor ? `${dominantColor}15` : undefined
      }}>
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-1000" 
          style={{ backgroundColor: dominantColor ? `${dominantColor}60` : 'rgba(219, 39, 119, 0.2)' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-1000" 
          style={{ backgroundColor: dominantColor ? `${dominantColor}50` : 'rgba(147, 51, 234, 0.2)' }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        <button 
          onClick={() => router.back()}
          className="absolute -top-16 left-0 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <div className="glass p-6 sm:p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-tr from-purple-500/30 to-pink-500/30 flex items-center justify-center border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.3)]">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-pink-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">Taste Preferences</h1>
              <p className="text-sm md:text-base text-gray-400 mt-1">Train your personal recommendation engine.</p>
            </div>
          </div>

          <div className="relative min-h-[450px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full absolute top-0"
                >
                  <h4 className="text-xl sm:text-2xl text-white font-bold mb-2">Step 1: What do you love?</h4>
                  <p className="text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg">Select the genres you enjoy watching.</p>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-12">
                    {genresList.map(g => {
                      const active = selectedGenres.includes(g);
                      return (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          key={g}
                          onClick={() => toggleGenre(g)}
                          className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                            active 
                              ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)] border border-transparent" 
                              : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/30"
                          }`}
                        >
                          {g}
                        </motion.button>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-end mt-4 sm:mt-8">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={proceedToStep2}
                      disabled={selectedGenres.length === 0 || isFetchingRecommendations}
                      className="px-6 py-3 sm:px-8 sm:py-3.5 bg-white text-black font-bold text-base sm:text-lg rounded-xl disabled:opacity-50 transition-all hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2"
                    >
                      {isFetchingRecommendations ? "Fetching..." : "Next Step"} <span className="text-xl">→</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 2 && currentMovie && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center w-full absolute top-0"
                >
                  <h4 className="text-xl sm:text-2xl text-white font-bold mb-2">Step 2: Rate these movies</h4>
                  <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">Swipe left to dislike, swipe right to like.</p>
                  
                  {/* Tinder Card wrapper for animation */}
                  <div className="relative w-full max-w-[260px] sm:max-w-[300px] aspect-[3/4] perspective-1000">
                    <AnimatePresence>
                      <motion.div 
                        key={currentMovie.id}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={handleDragEnd}
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute inset-0 rounded-[2rem] p-3 sm:p-4 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-gray-900/80 cursor-grab active:cursor-grabbing backdrop-blur-2xl"
                        style={{
                          boxShadow: dominantColor ? `0 20px 50px -20px ${dominantColor}80` : undefined,
                          x, 
                          rotate, 
                          opacity 
                        }}
                      >
                        {/* Poster Image Area */}
                        <div className="w-full flex-1 rounded-[1.25rem] overflow-hidden relative shadow-inner bg-black">
                          <img 
                            src={currentMovie.image.startsWith('http') ? `/api/proxy-image?url=${encodeURIComponent(currentMovie.image)}` : currentMovie.image} 
                            alt={currentMovie.title} 
                            className="w-full h-full object-cover pointer-events-none" 
                          />
                        </div>
                        
                        {/* Title and Tags Area */}
                        <div className="pt-4 pb-1 px-1 text-center pointer-events-none h-[5rem] flex flex-col justify-center">
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 leading-tight truncate px-2 drop-shadow-sm">
                            {currentMovie.title}
                          </h3>
                          <div className="flex flex-wrap gap-1.5 justify-center overflow-hidden h-[22px]">
                            {currentMovie.tags.slice(0, 3).map((t: string) => (
                              <span key={t} className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-gray-300 bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-md border border-white/5 whitespace-nowrap">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
              
              {step === 2 && !currentMovie && (
                <motion.div 
                  key="done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center absolute inset-0"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500/30 to-pink-500/30 flex items-center justify-center mb-6 border border-pink-500/30"
                  >
                    <Sparkles className="w-10 h-10 text-pink-400" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-2">All Set!</h3>
                  <p className="text-gray-400 text-lg">We've saved your preferences. Redirecting to your dashboard...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
