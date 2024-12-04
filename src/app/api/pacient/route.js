import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req = new NextRequest()) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const pacient = await prisma.pacient.findUnique({
        where: { id: Number(id) },
      });
      return NextResponse.json(pacient, { status: 200 });
    } else {
      const pacients = await prisma.pacient.findMany();
      return NextResponse.json(pacients, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching pacients" },
      { status: 500 }
    );
  }
}

export async function POST(req = new NextRequest()) {
  try {
    const { nume, prenume, cnp, adresa, telefon, consimtamantDate, anamneza } =
      await req.json();
    const newPacient = await prisma.pacient.create({
      data: {
        nume,
        prenume,
        cnp,
        adresa,
        telefon,
        consimtamantDate,
        anamneza,
      },
    });
    return NextResponse.json(newPacient, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating pacient" },
      { status: 500 }
    );
  }
}

export async function PUT(req = new NextRequest()) {
  try {
    const { id, ...data } = await req.json();
    const updatedPacient = await prisma.pacient.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(updatedPacient, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating pacient" },
      { status: 500 }
    );
  }
}

export async function DELETE(req = new NextRequest()) {
  try {
    const { id } = await req.json();
    await prisma.pacient.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "User saved" }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
