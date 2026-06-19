"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Heart, ThumbsDown, ChevronLeft } from "lucide-react";
import { Movie } from "@/lib/data";
import { FastAverageColor } from "fast-average-color";

export default function OnboardingPage() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [step, setStep] = useState(1);
  
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [likedMovies, setLikedMovies] = useState<string[]>([]);
  const [dislikedMovies, setDislikedMovies] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/movies")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMovies(data);
        }
      });
  }, []);

  const genresList = [
    "Action", "Adventure", "Animation", "Biography", "Comedy",
    "Crime", "Documentary", "Drama", "Family", "Fantasy",
    "History", "Horror", "Music", "Mystery", "Romance",
    "Sci-Fi", "Sports", "Thriller", "War", "Western"
  ];

  // Filter movies for swiping based on selected genres
  const swipeMovies = useMemo(() => {
    if (selectedGenres.length === 0) return [];
    return movies.filter(m => (m.tags || []).some(g => selectedGenres.includes(g)));
  }, [movies, selectedGenres]);

  const currentSwipeIndex = likedMovies.length + dislikedMovies.length;
  const currentMovie = swipeMovies[currentSwipeIndex];

  const toggleGenre = (g: string) => {
    setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };

  const handleSwipe = (action: 'like' | 'dislike') => {
    if (!currentMovie) return;
    
    if (action === 'like') setLikedMovies([...likedMovies, currentMovie.id]);
    if (action === 'dislike') setDislikedMovies([...dislikedMovies, currentMovie.id]);
    
    if (currentSwipeIndex + 1 >= Math.min(swipeMovies.length, 10)) { // limit to 10 swipes
      finishOnboarding(action === 'like' ? [...likedMovies, currentMovie.id] : likedMovies);
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

        <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500/30 to-pink-500/30 flex items-center justify-center border border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              <Sparkles className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Taste Preferences</h1>
              <p className="text-sm text-gray-400">Train your personal recommendation engine.</p>
            </div>
          </div>

          <div className="relative min-h-[400px]">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 absolute inset-0">
                <h4 className="text-xl text-white font-bold mb-2">Step 1: What do you love?</h4>
                <p className="text-gray-400 mb-8">Select the genres you enjoy watching.</p>
                
                <div className="flex flex-wrap gap-3 mb-12">
                  {genresList.map(g => {
                    const active = selectedGenres.includes(g);
                    return (
                      <button 
                        key={g}
                        onClick={() => toggleGenre(g)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                          active 
                            ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] border border-transparent scale-105" 
                            : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/30"
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={() => setStep(2)}
                    disabled={selectedGenres.length === 0}
                    className="px-8 py-3 bg-white text-black font-semibold rounded-xl disabled:opacity-50 transition-all hover:bg-gray-200 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && currentMovie && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center absolute inset-0">
                <h4 className="text-xl text-white font-bold mb-2">Step 2: Rate these movies</h4>
                <p className="text-gray-400 mb-6">Swipe based on your selected genres.</p>
                
                {/* Tinder Card */}
                <div 
                  className="relative w-80 h-[30rem] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-gray-900 group backdrop-blur-xl"
                  style={{
                    boxShadow: dominantColor ? `0 20px 50px -20px ${dominantColor}80` : undefined
                  }}
                >
                  <img 
                    src={currentMovie.image} 
                    alt={currentMovie.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 z-20" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-center z-30">
                    <h3 className="text-3xl font-bold text-white mb-3 leading-tight drop-shadow-md">{currentMovie.title}</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {currentMovie.tags.slice(0, 3).map(t => (
                        <span key={t} className="text-[11px] uppercase tracking-wider font-bold text-gray-300 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-12 mt-8">
                  <button 
                    onClick={() => handleSwipe('dislike')}
                    className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/40 hover:scale-110"
                  >
                    <ThumbsDown className="w-7 h-7" />
                  </button>
                  <button 
                    onClick={() => handleSwipe('like')}
                    className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-lg hover:shadow-green-500/40 hover:scale-110"
                  >
                    <Heart className="w-10 h-10 fill-current" />
                  </button>
                </div>
              </div>
            )}
            
            {step === 2 && !currentMovie && (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">All Set!</h3>
                <p className="text-gray-400 mt-2">We've saved your preferences. Redirecting to your dashboard...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
