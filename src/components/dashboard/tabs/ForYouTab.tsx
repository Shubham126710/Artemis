import { useState, useEffect } from "react";
import { Movie } from "@/lib/data";
import { Star, Sparkles, Settings } from "lucide-react";

interface ForYouTabProps {
  movies: Movie[];
  onBookMovie: (movieId: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function ForYouTab({ movies, onBookMovie, setActiveTab }: ForYouTabProps) {
  const [savedGenres, setSavedGenres] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const genres = JSON.parse(localStorage.getItem('silverSeat_genres') || '[]');
    setSavedGenres(genres);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (savedGenres.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-20 animate-in fade-in zoom-in-95 duration-700">
        <div className="w-20 h-20 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-6 border border-pink-500/30">
          <Sparkles className="w-10 h-10 text-pink-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Unlock Your Taste</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          We need to know what you love. Take our quick cinematic onboarding test to get personalized movie recommendations powered by our engine.
        </p>
        <button 
          onClick={() => setActiveTab("settings")}
          className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all flex items-center gap-2"
        >
          <Settings className="w-5 h-5" />
          Go to Settings
        </button>
      </div>
    );
  }

  // Recommendation Engine Logic (Heuristic based on saved genres)
  // We sort movies by how many of their genres overlap with savedGenres.
  const recommendedMovies = movies
    .map(movie => {
      const matchCount = (movie.genres || movie.tags || []).filter(g => savedGenres.includes(g)).length;
      return { ...movie, matchScore: matchCount };
    })
    .filter(m => m.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 16); // Top 16 recommendations

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            <Sparkles className="w-6 h-6 text-pink-500" />
            Made for You
          </h2>
          <p className="text-sm text-gray-400 mt-1">Based on your liked genres: {savedGenres.join(", ")}</p>
        </div>
        <button 
          onClick={() => setActiveTab("settings")}
          className="text-sm text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
        >
          <Settings className="w-4 h-4" />
          Update Preferences
        </button>
      </div>

      {recommendedMovies.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-xl font-medium">No movies match your taste profile right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedMovies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="group relative rounded-2xl overflow-hidden glass border border-white/10 hover:border-pink-500/50 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
              style={{ animationDuration: '700ms', animationDelay: `${index * 50}ms` }}
              onClick={() => onBookMovie(movie.id)}
            >
              {/* Poster */}
              <div className="aspect-[2/3] relative overflow-hidden">
                <img 
                  src={movie.image} 
                  alt={movie.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-600 to-purple-600 text-xs font-bold rounded-full text-white shadow-lg shadow-pink-500/30">
                    {Math.round((movie.matchScore / savedGenres.length) * 100)}% MATCH
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col gap-3">
                <h3 className="text-xl font-bold text-white leading-tight group-hover:text-pink-200 transition-colors">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{movie.rating}</span>
                  </div>
                  <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-md transition-colors border border-white/20 group-hover:bg-pink-500 group-hover:border-pink-500">
                    BOOK
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
