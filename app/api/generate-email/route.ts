import { NextResponse } from "next/server";
import { generateEmail } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const { prompt, email } = await req.json();
    const mail = await generateEmail({ prompt, email });

    return NextResponse.json({ mail });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}