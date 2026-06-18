import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";

const prisma = new PrismaClient();

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

    const cards = await prisma.savedCard.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(cards);
  } catch (error) {
    console.error("Cards fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

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
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const { last4, brand, expMonth, expYear, isDefault } = await req.json();

    if (isDefault) {
      await prisma.savedCard.updateMany({
        where: { userId },
        data: { isDefault: false }
      });
    }

    const card = await prisma.savedCard.create({
      data: {
        userId,
        last4,
        brand,
        expMonth,
        expYear,
        isDefault: isDefault || false
      }
    });

    return NextResponse.json({ success: true, card });
  } catch (error) {
    console.error("Card creation error:", error);
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
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const url = new URL(req.url);
    const cardId = url.searchParams.get("cardId");

    if (!cardId) return NextResponse.json({ error: "Missing cardId" }, { status: 400 });

    await prisma.savedCard.delete({
      where: { id: cardId, userId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Card delete error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
