import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req = new NextRequest()) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const restanta = await prisma.restanta.findUnique({
        where: { id: Number(id) },
      });
      return NextResponse.json(restanta, { status: 200 });
    } else {
      const restante = await prisma.restanta.findMany();
      return NextResponse.json(restante, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching restante" },
      { status: 500 }
    );
  }
}

export async function POST(req = new NextRequest()) {
  try {
    const { data } = await req.json();
    const newRestanta = await prisma.restanta.create({
      data,
    });
    return NextResponse.json(newRestanta, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating restanta" },
      { status: 500 }
    );
  }
}

export async function PUT(req = new NextRequest()) {
  try {
    const { id, ...data } = await req.json();
    const updatedRestanta = await prisma.restanta.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(updatedRestanta, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating restanta" },
      { status: 500 }
    );
  }
}

export async function DELETE(req = new NextRequest()) {
  try {
    const { id } = await req.json();
    await prisma.restanta.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting restanta" },
      { status: 500 }
    );
  }
}
