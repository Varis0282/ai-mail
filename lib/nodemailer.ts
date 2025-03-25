import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, body: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail", // or your preferred service
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: body,
    });

    return info;
}
