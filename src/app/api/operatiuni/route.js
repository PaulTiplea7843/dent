import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req = new NextRequest()) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const operatiune = await prisma.operatiune.findUnique({
        where: { id: Number(id) },
      });
      return NextResponse.json(operatiune, { status: 200 });
    } else {
      const operatiuni = await prisma.operatiune.findMany();
      return NextResponse.json(operatiuni, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching operatiuni" },
      { status: 500 }
    );
  }
}

export async function POST(req = new NextRequest()) {
  try {
    const { data } = await req.json();
    const newOperatiune = await prisma.operatiune.create({
      data,
    });
    return NextResponse.json(newOperatiune, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating operatiune" },
      { status: 500 }
    );
  }
}

export async function PUT(req = new NextRequest()) {
  try {
    const { id, ...data } = await req.json();
    const updatedOperatiune = await prisma.operatiune.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(updatedOperatiune, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating operatiune" },
      { status: 500 }
    );
  }
}

export async function DELETE(req = new NextRequest()) {
  try {
    const { id } = await req.json();
    await prisma.operatiune.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting operatiune" },
      { status: 500 }
    );
  }
}
