import { NextResponse } from "next/server";

export async function GET(request) {
  const data = { message: "App is working!" };
  return NextResponse.json(data);
}
