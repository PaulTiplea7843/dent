import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req = new NextRequest()) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const programare = await prisma.programare.findUnique({
        where: { id: Number(id) },
      });
      return NextResponse.json(programare, { status: 200 });
    } else {
      const programari = await prisma.programare.findMany();
      return NextResponse.json(programari, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching programari" },
      { status: 500 }
    );
  }
}

export async function POST(req = new NextRequest()) {
  try {
    const { data, ora, pacientId, medicId } = await req.json();
    const newProgramare = await prisma.programare.create({
      data: {
        data,
        ora,
        pacientId,
        medicId,
      },
    });
    return NextResponse.json(newProgramare, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating programare" },
      { status: 500 }
    );
  }
}

export async function PUT(req = new NextRequest()) {
  try {
    const { id, ...data } = await req.json();
    const updatedProgramare = await prisma.programare.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(updatedProgramare, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating programare" },
      { status: 500 }
    );
  }
}

export async function DELETE(req = new NextRequest()) {
  try {
    const { id } = await req.json();
    await prisma.programare.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting programare" },
      { status: 500 }
    );
  }
}
