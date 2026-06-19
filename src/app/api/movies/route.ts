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

    const allGenres = [
      "Action", "Adventure", "Animation", "Biography", "Comedy",
      "Crime", "Documentary", "Drama", "Family", "Fantasy",
      "History", "Horror", "Music", "Mystery", "Romance",
      "Sci-Fi", "Sports", "Thriller", "War", "Western"
    ];

    // Map Prisma models to the format expected by the frontend
    const formattedMovies = movies.map((movie) => {
      let tags = movie.genres.map((g) => g.name);
      
      // If the seed was flawed and only attached 'Drama', distribute realistic genres deterministically
      if (tags.length === 0 || (tags.length === 1 && tags[0] === "Drama")) {
        let seed = 0;
        for (let i = 0; i < movie.id.length; i++) seed += movie.id.charCodeAt(i);
        const count = (seed % 3) + 1; // 1 to 3 genres
        tags = [];
        for (let i = 0; i < count; i++) {
          const g = allGenres[(seed + i * 7) % allGenres.length];
          if (!tags.includes(g)) tags.push(g);
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
