import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req = new NextRequest()) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const fisier = await prisma.fisier.findUnique({
        where: { id: Number(id) },
      });
      return NextResponse.json(fisier, { status: 200 });
    } else {
      const fisiere = await prisma.fisier.findMany();
      return NextResponse.json(fisiere, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching fisiere" },
      { status: 500 }
    );
  }
}

export async function POST(req = new NextRequest()) {
  try {
    const { data } = await req.json();
    const newFisier = await prisma.fisier.create({
      data,
    });
    return NextResponse.json(newFisier, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating fisier" },
      { status: 500 }
    );
  }
}

export async function PUT(req = new NextRequest()) {
  try {
    const { id, ...data } = await req.json();
    const updatedFisier = await prisma.fisier.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(updatedFisier, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating fisier" },
      { status: 500 }
    );
  }
}

export async function DELETE(req = new NextRequest()) {
  try {
    const { id } = await req.json();
    await prisma.fisier.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting fisier" },
      { status: 500 }
    );
  }
}
