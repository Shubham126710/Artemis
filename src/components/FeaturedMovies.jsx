import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';

const movies = [
  {
    id: 1,
    title: "F1",
    poster: "/F1_movie.jpg",
    rating: "4.5",
    genre: "Sports / Drama",
    duration: "2h 10m",
    status: "Now Showing"
  },
  {
    id: 2,
    title: "Superman",
    poster: "/superman_movie.jpeg",
    rating: "4.8",
    genre: "Action / Sci-Fi",
    duration: "2h 20m",
    status: "Trending"
  },
  {
    id: 3,
    title: "Project Hail Mary",
    poster: "/Project_Hail_Mary_movie.jpg",
    rating: "4.9",
    genre: "Sci-Fi / Thriller",
    duration: "2h 15m",
    status: "Opening Week"
  },
  {
    id: 4,
    title: "Obsession",
    poster: "/obsession_movie.jpg",
    rating: "4.2",
    genre: "Thriller",
    duration: "1h 50m",
    status: "Coming Soon"
  },
  {
    id: 5,
    title: "Super Mario Galaxy",
    poster: "/super_mario_galaxy_movie.jpeg",
    rating: "4.7",
    genre: "Animation / Adventure",
    duration: "1h 45m",
    status: "Coming Soon"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const FeaturedMovies = () => {
  return (
    <section id="movies" className="py-24 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Now Trending</h2>
            <p className="text-gray-400 max-w-2xl text-lg">Experience the most anticipated blockbusters, handpicked for you in stunning cinematic quality.</p>
          </div>
          <button className="text-white hover:text-glow-amber transition-colors font-medium flex items-center gap-2 group whitespace-nowrap">
            View All Movies 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {movies.map((movie) => (
            <motion.div 
              key={movie.id}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-b from-glow-crimson to-glow-purple rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
              
              <div className="relative bg-bg-elevated h-full rounded-2xl overflow-hidden transform transition-transform duration-500 group-hover:-translate-y-2">
                {/* Poster Image */}
                <div className="aspect-[2/3] w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/20 to-transparent z-10"></div>
                  <img 
                    src={movie.poster} 
                    alt={movie.title} 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="glass px-3 py-1 rounded-full text-xs font-semibold text-white tracking-wider uppercase">
                      {movie.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-glow-amber transition-colors">{movie.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-glow-amber fill-glow-amber" />
                      <span className="font-medium text-white">{movie.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{movie.duration}</span>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-400 font-medium">
                    {movie.genre}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedMovies;
