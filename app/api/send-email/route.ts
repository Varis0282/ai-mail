import { sendEmail } from "@/lib/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.json();
    const { to, subject, body } = data;
    try {
        const result = await sendEmail(to, subject, body);
        return NextResponse.json({ result });
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
