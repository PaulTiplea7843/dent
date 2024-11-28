import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req = new NextRequest()) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const semnatura = await prisma.semnatura.findUnique({
        where: { id: Number(id) },
      });
      return NextResponse.json(semnatura, { status: 200 });
    } else {
      const semnaturi = await prisma.semnatura.findMany();
      return NextResponse.json(semnaturi, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching semnaturi" },
      { status: 500 }
    );
  }
}

export async function POST(req = new NextRequest()) {
  try {
    const { data } = await req.json();
    const newSemnatura = await prisma.semnatura.create({
      data,
    });
    return NextResponse.json(newSemnatura, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating semnatura" },
      { status: 500 }
    );
  }
}

export async function PUT(req = new NextRequest()) {
  try {
    const { id, ...data } = await req.json();
    const updatedSemnatura = await prisma.semnatura.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(updatedSemnatura, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating semnatura" },
      { status: 500 }
    );
  }
}

export async function DELETE(req = new NextRequest()) {
  try {
    const { id } = await req.json();
    await prisma.semnatura.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting semnatura" },
      { status: 500 }
    );
  }
}
