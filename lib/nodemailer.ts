import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, body: string, emailId: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const pixelUrl = `https://ai-mail-generator.netlify.app/api/email/open?emailId=${emailId}`;

    const htmlBody = `
        <div>
            ${body}
            <img src="${pixelUrl}" width="1" height="1" style="display:none;" />
        </div>
    `;

    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: htmlBody,
    });

    return info;
}

