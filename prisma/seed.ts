import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TMDB_API_KEY = "15d2ea6d0dc1d476efbca3eba2b9bbfb";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w1280";
const BASE_PROFILE_URL = "https://image.tmdb.org/t/p/w185";

const REQUESTED_MOVIES = [
  "Superman", "F1", "Project Hail Mary", "The Batman", "Dune: Part Two", "Oppenheimer", "Barbie",
  "Top Gun: Maverick", "Chhichhore",
  "Mission: Impossible", "Mission: Impossible - Fallout", "Mission: Impossible - Dead Reckoning Part One",
  "Frozen", "Frozen II",
  "Ice Age", "Ice Age: The Meltdown", "Ice Age: Dawn of the Dinosaurs", "Ice Age: Continental Drift", "Ice Age: Collision Course",
  "Madagascar", "Madagascar: Escape 2 Africa", "Madagascar 3: Europe's Most Wanted",
  "Jurassic World", "Jurassic World: Fallen Kingdom", "Jurassic World Dominion",
  "Joker", "The Dark Knight", "Wonder Woman", "Aquaman", "Zack Snyder's Justice League", "Man of Steel",
  "Avengers: Endgame", "Spider-Man: No Way Home", "Iron Man", "Guardians of the Galaxy", "Black Panther", "Thor: Ragnarok", "Avengers: Infinity War",
  "Real Steel", "Need for Speed",
  "Kung Fu Panda", "Kung Fu Panda 2", "Kung Fu Panda 3", "Kung Fu Panda 4",
  "Captain America: The First Avenger", "Captain America: The Winter Soldier", "Captain America: Civil War", "Iron Man 2", "Iron Man 3",
  "The Fast and the Furious", "2 Fast 2 Furious", "Fast Five", "Fast & Furious 6", "Furious 7", "The Fate of the Furious", "Fast X",
  "John Wick", "John Wick: Chapter 2", "John Wick: Chapter 3 - Parabellum", "John Wick: Chapter 4",
  "The Matrix", "The Lord of the Rings: The Fellowship of the Ring", "Interstellar", "Inception",
  "3 Idiots", "Dangal", "PK", "Bajrangi Bhaijaan", "Sholay", "Dilwale Dulhania Le Jayenge", "Kabhi Khushi Kabhie Gham",
  "Lagaan", "Zindagi Na Milegi Dobara", "Swades", "Chak De! India", "Yeh Jawaani Hai Deewani", "Queen", "Barfi!",
  "Taare Zameen Par", "Drishyam", "Kahaani", "Andhadhun", "Uri: The Surgical Strike", "Gully Boy", "Kabir Singh",
  "Pathaan", "Jawan", "Animal", "RRR", "Baahubali: The Beginning", "Baahubali 2: The Conclusion", "K.G.F: Chapter 1", "K.G.F: Chapter 2", "Pushpa: The Rise"
];

async function fetchWithProxy(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("direct failed");
    return res;
  } catch (e) {
    console.log(`Direct fetch failed, using proxy for ${url.substring(0, 50)}...`);
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    const res = await fetch(proxyUrl);
    if (!res.ok) {
      console.log("corsproxy failed, trying api.codetabs");
      const backupProxy = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`;
      const backupRes = await fetch(backupProxy);
      return backupRes;
    }
    return res;
  }
}

async function fetchMovies() {
  console.log("Fetching TMDB Genres...");
  const genresRes = await fetchWithProxy(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`);
  const genresData = await genresRes.json();
  const genreMap = new Map();
  if (genresData.genres) {
    genresData.genres.forEach((g: any) => genreMap.set(g.id, g.name));
  }

  const rawMovies = [];

  console.log("Searching for requested movies...");
  for (const query of REQUESTED_MOVIES) {
    const res = await fetchWithProxy(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      rawMovies.push(data.results[0]); // Take the top result for the search
    }
  }

  console.log("Padding with trending movies...");
  let page = 1;
  while (rawMovies.length < 350 && page <= 20) {
    const res = await fetchWithProxy(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
    const data = await res.json();
    if (data.results) {
      rawMovies.push(...data.results);
    }
    page++;
  }

  // Remove duplicates early and filter out adult/explicit movies
  const uniqueMoviesMap = new Map();
  const explicitKeywords = ["porn", "sex", "erotica", "nympho", "lust", "desire", "erotic", "seduction", "xxx", "sange"];
  
  for (const m of rawMovies) {
    if (m.adult) continue;
    
    const titleLower = (m.title || "").toLowerCase();
    const isExplicit = explicitKeywords.some(keyword => titleLower.includes(keyword));
    if (isExplicit) continue;

    if (!uniqueMoviesMap.has(m.id)) {
      uniqueMoviesMap.set(m.id, m);
    }
  }
  const moviesToProcess = Array.from(uniqueMoviesMap.values()).slice(0, 300);

  const formattedMovies = [];
  
  for (const movie of moviesToProcess) {
    console.log(`Fetching details for: ${movie.title}`);
    
    // Fetch credits for cast
    const creditsRes = await fetchWithProxy(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}`);
    const creditsData = await creditsRes.json();
    const cast = creditsData.cast ? creditsData.cast.slice(0, 5) : [];

    // Determine Certificate
    const certificate = movie.adult ? "A" : (movie.genre_ids?.includes(16) ? "U" : "U/A");
    
    const duration = `${Math.floor(Math.random() * 60) + 90} mins`;
    
    // Map Genres
    const genreNames = (movie.genre_ids || [])
      .map((id: number) => genreMap.get(id))
      .filter(Boolean);
    
    formattedMovies.push({
      id: `tmdb_${movie.id}`,
      title: movie.title,
      image: movie.poster_path ? `${BASE_IMAGE_URL}${movie.poster_path}` : "https://via.placeholder.com/1280x1920?text=No+Poster",
      rating: Number((movie.vote_average / 2).toFixed(1)), // Scale 10 to 5
      imdbRating: movie.vote_average,
      rtRating: Math.floor(movie.vote_average * 10),
      isNew: Math.random() > 0.7,
      duration: duration,
      releaseYear: movie.release_date ? parseInt(movie.release_date.split('-')[0]) : null,
      certificate: certificate,
      synopsis: movie.overview || "No synopsis available.",
      trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " trailer")}`,
      imdbUrl: `https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`,
      genres: genreNames.length > 0 ? genreNames : ["Drama"],
      cast: cast.map((c: any) => ({
        name: c.name,
        profile: c.profile_path ? `${BASE_PROFILE_URL}${c.profile_path}` : null
      }))
    });
  }
  
  return formattedMovies;
}

async function main() {
  const moviesData = await fetchMovies();
  // Remove duplicates
  const uniqueMoviesMap = new Map();
  for (const m of moviesData) {
    uniqueMoviesMap.set(m.id, m);
  }
  const uniqueMovies = Array.from(uniqueMoviesMap.values());

  console.log(`Seeding database with ${uniqueMovies.length} real TMDB movies...`);

  // First, clear existing movies to avoid clutter
  await prisma.movie.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.cast.deleteMany();

  for (const movie of uniqueMovies) {
    await prisma.movie.upsert({
      where: { id: movie.id },
      update: {},
      create: {
        id: movie.id,
        title: movie.title,
        image: movie.image,
        rating: movie.rating,
        imdbRating: movie.imdbRating,
        rtRating: movie.rtRating,
        isNew: movie.isNew,
        duration: movie.duration,
        releaseYear: movie.releaseYear,
        certificate: movie.certificate,
        synopsis: movie.synopsis,
        trailerUrl: movie.trailerUrl,
        imdbUrl: movie.imdbUrl,
        genres: {
          connectOrCreate: movie.genres.map((g: string) => ({
            where: { name: g },
            create: { name: g },
          }))
        },
        cast: {
          create: movie.cast.map((c: any) => ({
            name: c.name,
            profile: c.profile
          }))
        }
      }
    });
  }

  console.log("Seeding complete! You now have a flawless movie catalogue.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
