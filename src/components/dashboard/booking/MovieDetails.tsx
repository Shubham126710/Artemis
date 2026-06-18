import { useState, useEffect } from "react";
import { Play, Heart } from "lucide-react";
import { Movie } from "@/lib/data";

interface MovieDetailsProps {
  movieId: string;
  movies: Movie[];
  onProceed: () => void;
}

export default function MovieDetails({ movieId, movies, onProceed }: MovieDetailsProps) {
  const movie = movies.find(m => m.id === movieId);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // Check if this movie is in the user's wishlist
    fetch("/api/wishlist")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setIsWishlisted(data.some(w => w.movieId === movieId));
        }
      })
      .catch(console.error);
  }, [movieId]);

  const toggleWishlist = async () => {
    try {
      if (isWishlisted) {
        await fetch(`/api/wishlist?movieId=${movieId}`, { method: 'DELETE' });
        setIsWishlisted(false);
      } else {
        await fetch(`/api/wishlist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ movieId })
        });
        setIsWishlisted(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!movie) return <div className="text-white text-center">Movie not found</div>;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-4xl mx-auto mt-4 pb-24 relative overflow-hidden rounded-3xl glass border border-white/10">
      
      {/* Hero Image */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden">
        <img 
          src={movie.image} 
          alt={movie.title} 
          className="w-full h-full object-cover object-top filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/60 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 leading-tight drop-shadow-lg" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              {movie.title}
            </h1>
            <div className="flex gap-4 items-center mt-4">
              <button 
                onClick={() => { if (movie.trailerUrl) window.open(movie.trailerUrl, '_blank') }}
                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                <Play className="w-4 h-4 fill-current" /> Trailer
              </button>
            </div>
          </div>
          <button 
            onClick={toggleWishlist}
            className={`hidden sm:flex items-center gap-2 transition-colors ${isWishlisted ? 'text-red-500 hover:text-red-400' : 'text-white hover:text-red-400'}`}
          >
            <Heart className={`w-8 h-8 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Info Stats */}
      <div className="flex justify-between items-center px-8 py-6 border-b border-white/10 bg-white/5">
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Language</p>
          <p className="font-bold text-white">English, Hindi</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Duration</p>
          <p className="font-bold text-white">{movie.duration}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Certificate</p>
          <p className="font-bold text-white">{movie.certificate}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        <p className="text-gray-300 leading-relaxed text-lg">
          {movie.synopsis}
        </p>

        {/* Highlight Card */}
        <div className="relative rounded-2xl overflow-hidden p-6 border border-white/10">
          <div className="absolute inset-0 bg-white/5 blur-xl" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-white font-bold mb-2">Critically Acclaimed</h3>
              <p className="text-sm text-gray-400">This captivating masterpiece weaves together a spellbinding tale cementing its position as visionary filmmaking.</p>
            </div>
            <div className="flex items-center gap-6 shrink-0">
              {movie.imdbRating && (
                <div className="flex flex-col items-center">
                  <img src="/IMDb.svg" alt="IMDb" className="h-5 object-contain mb-1" />
                  <span className="text-2xl font-bold text-white leading-none">{movie.imdbRating}<span className="text-sm text-gray-500">/10</span></span>
                </div>
              )}
              {movie.rtRating && (
                <div className="flex flex-col items-center">
                  <img src="/RT.svg" alt="Rotten Tomatoes" className="h-5 object-contain mb-1 rounded-sm" />
                  <span className="text-2xl font-bold text-white leading-none">{movie.rtRating}%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cast */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold text-white">Cast</h3>
            <button 
              onClick={() => { if (movie.imdbUrl) window.open(movie.imdbUrl, '_blank') }}
              className="text-sm text-gray-300 cursor-pointer hover:underline hover:text-white transition-colors"
            >
              View all on IMDb
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {movie.cast.map((actor, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 shrink-0 w-20">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-gray-500 font-bold text-xl overflow-hidden shadow-lg shrink-0">
                  {actor.profile ? (
                    <img src={actor.profile} alt={actor.name} className="w-full h-full object-cover" />
                  ) : (
                    actor.name.charAt(0)
                  )}
                </div>
                <span className="text-xs text-center text-gray-400 leading-tight">{actor.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* Action Footer */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-bg-base via-bg-base/90 to-transparent border-t border-white/10">
        <button 
          onClick={onProceed}
          className="w-full py-4 bg-glow-orange backdrop-blur-md rounded-xl font-bold text-white text-lg border border-glow-orange shadow-[0_0_20px_var(--color-glow-orange)] hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
        >
          Book tickets
        </button>
      </div>

    </div>
  );
}
