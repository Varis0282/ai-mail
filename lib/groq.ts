import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_KEY || "",
});

export async function generateEmail({ prompt, email }: { prompt: string; email: string }) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [{
            role: "user",
            content: `You are an email bot. Please write an email to ${email} where the prompt is ${prompt}.
            Nothing else should be included in the email.Don't add subject or recipient email in the email.
            `
        }],
        model: "llama-3.3-70b-versatile", // or any supported model
    });

    console.log("🚀 => chatCompletion.choices[0]?.message.content:", chatCompletion.choices[0]?.message.content);
    return chatCompletion.choices[0]?.message.content || "";

    // const resp = Happy birthday
    // return resp;
}
