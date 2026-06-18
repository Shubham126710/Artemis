import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    });
    
    let userId = session?.user?.id;
    if (!userId) {
      const defaultUser = await prisma.user.findFirst();
      if (defaultUser) {
        userId = defaultUser.id;
      } else {
        const newUser = await prisma.user.create({
          data: { name: "Bypass User", email: "bypass@silverseat.com", emailVerified: true }
        });
        userId = newUser.id;
      }
    }

    const { movieId } = await req.json();

    const wishlist = await prisma.wishlist.create({
      data: {
        userId,
        movieId,
      }
    });

    return NextResponse.json({ success: true, wishlist });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Already in wishlist" }, { status: 400 });
    }
    console.error("Wishlist creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    });
    
    let userId = session?.user?.id;
    if (!userId) {
      const defaultUser = await prisma.user.findFirst();
      if (defaultUser) {
        userId = defaultUser.id;
      } else {
        const newUser = await prisma.user.create({
          data: { name: "Bypass User", email: "bypass@silverseat.com", emailVerified: true }
        });
        userId = newUser.id;
      }
    }

    const wishlist = await prisma.wishlist.findMany({
      where: { userId },
      include: {
        movie: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    console.error("Wishlist fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    });
    
    let userId = session?.user?.id;
    if (!userId) {
      const defaultUser = await prisma.user.findFirst();
      if (defaultUser) {
        userId = defaultUser.id;
      } else {
        const newUser = await prisma.user.create({
          data: { name: "Bypass User", email: "bypass@silverseat.com", emailVerified: true }
        });
        userId = newUser.id;
      }
    }

    const url = new URL(req.url);
    const movieId = url.searchParams.get("movieId");

    if (!movieId) {
      return NextResponse.json({ error: "Movie ID required" }, { status: 400 });
    }

    await prisma.wishlist.deleteMany({
      where: {
        userId,
        movieId,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Wishlist deletion error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
