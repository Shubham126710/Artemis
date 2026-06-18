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

    // Map Prisma models to the format expected by the frontend
    const formattedMovies = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      image: movie.image,
      tags: movie.genres.map((g) => g.name),
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
    }));

    return NextResponse.json(formattedMovies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
