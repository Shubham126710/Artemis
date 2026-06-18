import { Star } from "lucide-react";
import { Movie } from "@/lib/data";
import { useState, useMemo } from "react";

interface HomeTabProps {
  movies: Movie[];
  onBookMovie: (movieId: string) => void;
}

export default function HomeTab({ movies, onBookMovie }: HomeTabProps) {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const genres = useMemo(() => {
    const allGenres = movies.flatMap(m => {
      const mData = m as any;
      return mData.genres ? mData.genres.map((g: any) => g.name) : (m.tags || []);
    });
    const unique = Array.from(new Set(allGenres));
    return ["All", ...unique.sort()];
  }, [movies]);

  const years = useMemo(() => {
    const allYears = movies.map(m => m.releaseYear).filter(y => y != null) as number[];
    const unique = Array.from(new Set(allYears));
    return ["All", ...unique.sort((a, b) => b - a).map(String)];
  }, [movies]);

  // Reset page when filters change
  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const filteredMovies = movies.filter(m => {
    const mData = m as any;
    const movieTags = mData.genres ? mData.genres.map((g: any) => g.name) : (m.tags || []);
    const matchGenre = selectedGenre === "All" || movieTags.includes(selectedGenre);
    const matchYear = selectedYear === "All" || m.releaseYear?.toString() === selectedYear;
    return matchGenre && matchYear;
  });

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const paginatedMovies = filteredMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          Now Showing
        </h2>
        <button className="text-sm text-gray-300 hover:text-white transition-colors">
          View All
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar flex-1">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                selectedGenre === genre
                  ? "bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {years.map(year => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                selectedYear === year
                  ? "bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {year === "All" ? "Any Year" : year}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedMovies.map((movie, index) => (
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
              <h3 className="text-xl font-bold text-white leading-tight group-hover:text-gray-300 transition-colors">
                {movie.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{movie.rating}</span>
                </div>
                <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-full backdrop-blur-md transition-colors border border-white/20 group-hover:bg-gray-200 group-hover:border-gray-200 group-hover:text-black">
                  BOOK
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12 mb-8">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          <span className="text-gray-400 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
