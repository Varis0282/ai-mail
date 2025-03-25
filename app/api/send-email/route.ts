import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();
    const data = await req.json();
    const { to, subject, body } = data;
    console.log("🚀 => to, subject, body:", to, subject, body);

    try {
        const result = await sendEmail(to, subject, body);
        return NextResponse.json({ result });
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
