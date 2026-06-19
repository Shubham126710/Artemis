import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        genres: true,
        cast: true,
      },
    });

    const realisticGenreMap: Record<string, string[]> = {
      "Superman": ["Action", "Sci-Fi", "Adventure"],
      "F1": ["Sports", "Drama", "Action"],
      "Project Hail Mary": ["Sci-Fi", "Adventure"],
      "The Batman": ["Action", "Crime", "Mystery"],
      "Dune: Part Two": ["Action", "Sci-Fi", "Adventure"],
      "Oppenheimer": ["Biography", "Drama", "History"],
      "Barbie": ["Comedy", "Fantasy", "Romance"],
      "Top Gun: Maverick": ["Action", "Drama"],
      "Chhichhore": ["Comedy", "Drama"],
      "Mission: Impossible": ["Action", "Thriller", "Adventure"],
      "Mission: Impossible - Fallout": ["Action", "Thriller", "Adventure"],
      "Mission: Impossible - Dead Reckoning Part One": ["Action", "Thriller", "Adventure"],
      "Frozen": ["Animation", "Family", "Fantasy"],
      "Frozen II": ["Animation", "Family", "Fantasy"],
      "Ice Age": ["Animation", "Family", "Comedy"],
      "Ice Age: The Meltdown": ["Animation", "Family", "Comedy"],
      "Ice Age: Dawn of the Dinosaurs": ["Animation", "Family", "Comedy"],
      "Ice Age: Continental Drift": ["Animation", "Family", "Comedy"],
      "Ice Age: Collision Course": ["Animation", "Family", "Comedy"],
      "Madagascar": ["Animation", "Family", "Comedy"],
      "Madagascar: Escape 2 Africa": ["Animation", "Family", "Comedy"],
      "Madagascar 3: Europe's Most Wanted": ["Animation", "Family", "Comedy"],
      "Jurassic World": ["Action", "Adventure", "Sci-Fi"],
      "Jurassic World: Fallen Kingdom": ["Action", "Adventure", "Sci-Fi"],
      "Jurassic World Dominion": ["Action", "Adventure", "Sci-Fi"],
      "Joker": ["Crime", "Drama", "Thriller"],
      "The Dark Knight": ["Action", "Crime", "Drama"],
      "Wonder Woman": ["Action", "Adventure", "Fantasy"],
      "Aquaman": ["Action", "Adventure", "Fantasy"],
      "Zack Snyder's Justice League": ["Action", "Adventure", "Sci-Fi"],
      "Man of Steel": ["Action", "Adventure", "Sci-Fi"],
      "Avengers: Endgame": ["Action", "Adventure", "Sci-Fi"],
      "Spider-Man: No Way Home": ["Action", "Adventure", "Sci-Fi"],
      "Iron Man": ["Action", "Adventure", "Sci-Fi"],
      "Iron Man 2": ["Action", "Adventure", "Sci-Fi"],
      "Iron Man 3": ["Action", "Adventure", "Sci-Fi"],
      "Guardians of the Galaxy": ["Action", "Adventure", "Comedy", "Sci-Fi"],
      "Black Panther": ["Action", "Adventure", "Sci-Fi"],
      "Thor: Ragnarok": ["Action", "Adventure", "Comedy", "Sci-Fi"],
      "Avengers: Infinity War": ["Action", "Adventure", "Sci-Fi"],
      "Real Steel": ["Action", "Sci-Fi", "Sports"],
      "Need for Speed": ["Action", "Crime", "Thriller"],
      "Kung Fu Panda": ["Animation", "Action", "Comedy", "Family"],
      "Kung Fu Panda 2": ["Animation", "Action", "Comedy", "Family"],
      "Kung Fu Panda 3": ["Animation", "Action", "Comedy", "Family"],
      "Kung Fu Panda 4": ["Animation", "Action", "Comedy", "Family"],
      "Captain America: The First Avenger": ["Action", "Adventure", "Sci-Fi"],
      "Captain America: The Winter Soldier": ["Action", "Adventure", "Sci-Fi", "Thriller"],
      "Captain America: Civil War": ["Action", "Adventure", "Sci-Fi"],
      "The Fast and the Furious": ["Action", "Crime", "Thriller"],
      "2 Fast 2 Furious": ["Action", "Crime", "Thriller"],
      "Fast Five": ["Action", "Crime", "Thriller"],
      "Fast & Furious 6": ["Action", "Crime", "Thriller"],
      "Furious 7": ["Action", "Crime", "Thriller"],
      "The Fate of the Furious": ["Action", "Crime", "Thriller"],
      "Fast X": ["Action", "Crime", "Thriller"],
      "John Wick": ["Action", "Crime", "Thriller"],
      "John Wick: Chapter 2": ["Action", "Crime", "Thriller"],
      "John Wick: Chapter 3 - Parabellum": ["Action", "Crime", "Thriller"],
      "John Wick: Chapter 4": ["Action", "Crime", "Thriller"],
      "The Matrix": ["Action", "Sci-Fi"],
      "The Lord of the Rings: The Fellowship of the Ring": ["Action", "Adventure", "Drama", "Fantasy"],
      "Interstellar": ["Adventure", "Drama", "Sci-Fi"],
      "Inception": ["Action", "Adventure", "Sci-Fi", "Thriller"],
      "3 Idiots": ["Comedy", "Drama"],
      "Dangal": ["Action", "Biography", "Drama", "Sports"],
      "PK": ["Comedy", "Drama", "Sci-Fi"],
      "Bajrangi Bhaijaan": ["Action", "Adventure", "Comedy", "Drama"],
      "Sholay": ["Action", "Adventure", "Comedy"],
      "Dilwale Dulhania Le Jayenge": ["Drama", "Romance"],
      "Kabhi Khushi Kabhie Gham": ["Drama", "Musical", "Romance", "Family"],
      "Lagaan": ["Drama", "Musical", "Sports"],
      "Zindagi Na Milegi Dobara": ["Comedy", "Drama", "Adventure"],
      "Swades": ["Drama"],
      "Chak De! India": ["Drama", "Family", "Sports"],
      "Yeh Jawaani Hai Deewani": ["Comedy", "Drama", "Romance"],
      "Queen": ["Adventure", "Comedy", "Drama"],
      "Barfi!": ["Comedy", "Drama", "Romance"],
      "Taare Zameen Par": ["Drama", "Family"],
      "Drishyam": ["Crime", "Drama", "Mystery", "Thriller"],
      "Kahaani": ["Mystery", "Thriller"],
      "Andhadhun": ["Crime", "Comedy", "Music", "Mystery", "Thriller"],
      "Uri: The Surgical Strike": ["Action", "Drama", "History", "War"],
      "Gully Boy": ["Drama", "Music"],
      "Kabir Singh": ["Action", "Drama", "Romance"],
      "Pathaan": ["Action", "Thriller"],
      "Jawan": ["Action", "Thriller"],
      "Animal": ["Action", "Crime", "Drama"],
      "RRR": ["Action", "Drama", "History"],
      "Baahubali: The Beginning": ["Action", "Drama", "Fantasy"],
      "Baahubali 2: The Conclusion": ["Action", "Drama", "Fantasy"],
      "K.G.F: Chapter 1": ["Action", "Crime", "Drama"],
      "K.G.F: Chapter 2": ["Action", "Crime", "Drama"],
      "Pushpa: The Rise - Part 1": ["Action", "Crime", "Drama", "Thriller"]
    };

    // Map Prisma models to the format expected by the frontend
    const formattedMovies = movies.map((movie) => {
      let tags = movie.genres.map((g) => g.name);
      
      // If the seed was flawed and only attached 'Drama', use the realistic map
      if (tags.length === 0 || (tags.length === 1 && tags[0] === "Drama")) {
        // Fallback to the realistic map if title matches
        const realisticTags = realisticGenreMap[movie.title] || Object.values(realisticGenreMap).find((v, i) => movie.title.includes(Object.keys(realisticGenreMap)[i]));
        if (realisticTags) {
          tags = realisticTags;
        } else {
          // Absolute fallback if it's not in the map
          tags = ["Drama"];
        }
      }

      return {
      id: movie.id,
      title: movie.title,
      image: movie.image,
      tags: tags,
      rating: movie.rating,
      imdbRating: movie.imdbRating,
      rtRating: movie.rtRating,
      isNew: movie.isNew,
      duration: movie.duration,
      certificate: movie.certificate,
      synopsis: movie.synopsis,
      releaseYear: movie.releaseYear,
      trailerUrl: movie.trailerUrl,
      imdbUrl: movie.imdbUrl,
      cast: movie.cast.map((c) => ({ name: c.name, profile: c.profile })),
    };
  });

    return NextResponse.json(formattedMovies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
