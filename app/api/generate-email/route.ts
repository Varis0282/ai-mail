import { NextApiRequest, NextApiResponse } from "next";
import { generateEmail } from "@/lib/groq";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();
    const data = await req.json();
    const { prompt, email } = data;
    try {
        const mail = await generateEmail({ prompt, email });
        return NextResponse.json({ mail });
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
