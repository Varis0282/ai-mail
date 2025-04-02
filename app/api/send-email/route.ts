import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from "@/lib/nodemailer";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Email } from "@/models/schema";

export async function POST(req: Request) {
    const data = await req.json();
    const { to, subject, body } = data;

    const emailId = uuidv4(); // generate unique ID

    await connectToDatabase();

    try {
        const result = await sendEmail(to, subject, body, emailId);

        const newEmail = new Email({
            recipient: to,
            subject,
            body,
            emailId,
        });
        await newEmail.save();
        console.log("Email sent: ", result);

        return NextResponse.json({ result, emailId });
    } catch (err: any) {
        console.log(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
