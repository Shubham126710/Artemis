import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth"; // Need to ensure auth object is used or headers

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    });
    
    // For bypass/dev mode, allow a fallback user
    let userId = session?.user?.id;
    if (!userId) {
      // Find the first user or create one for dev mode bypass
      const defaultUser = await prisma.user.findFirst();
      if (defaultUser) {
        userId = defaultUser.id;
      } else {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const body = await req.json();
    const { movieId, cinema, date, time, format, language, seats, totalPrice } = body;

    const booking = await prisma.booking.create({
      data: {
        userId,
        movieId,
        cinema,
        date,
        time,
        format,
        language,
        seats: JSON.stringify(seats),
        totalPrice,
      }
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Booking creation error:", error);
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
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        movie: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Booking fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
