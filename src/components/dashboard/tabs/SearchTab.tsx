import { useState } from "react";
import { Search, Star } from "lucide-react";
import { Movie } from "@/lib/data";

interface SearchTabProps {
  movies: Movie[];
  onBookMovie: (movieId: string) => void;
}

export default function SearchTab({ movies, onBookMovie }: SearchTabProps) {
  const [query, setQuery] = useState("");

  const filteredMovies = movies.filter(movie => {
    const titleMatch = (movie.title || "").toLowerCase().includes(query.toLowerCase());
    const tagMatch = (movie.tags || []).some(tag => tag.toLowerCase().includes(query.toLowerCase()));
    const castMatch = (movie.cast || []).some(c => c.name.toLowerCase().includes(query.toLowerCase()));
    return titleMatch || tagMatch || castMatch;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-glow-orange" />
        </div>
        <input
          type="text"
          placeholder="Search movies, genres, or tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 hover:border-glow-orange/50 focus:border-glow-orange text-white rounded-2xl py-4 pl-14 pr-4 outline-none transition-all duration-300 shadow-lg backdrop-blur-md"
        />
      </div>

      {/* Results */}
      {filteredMovies.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-xl font-medium">No movies found for "{query}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="group relative rounded-2xl overflow-hidden glass border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
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
                  {movie.isNew && (
                    <span className="px-3 py-1 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 text-xs font-bold rounded-full text-black shadow-lg shadow-white/20">
                      NEW
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col gap-3">
                <h3 className="text-xl font-bold text-white leading-tight group-hover:text-glow-orange transition-colors">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{movie.rating}</span>
                  </div>
                  <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-md transition-colors border border-white/20 group-hover:bg-glow-orange group-hover:border-glow-orange">
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
