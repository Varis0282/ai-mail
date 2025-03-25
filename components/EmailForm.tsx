"use client";

import { useState } from "react";

export default function EmailForm() {
    const [prompt, setPrompt] = useState("");
    const [emailBody, setEmailBody] = useState("");
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");

    const generate = async () => {
        const res = await fetch("/api/generate-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, email: to }),
        });
        const data = await res.json();
        setEmailBody(data.mail);
        setSubject("Email from AI");
    };

    const send = async () => {
        await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ to, subject, body: emailBody }),
        });
        alert("Email sent!");
    };

    return (
        <div className="max-w-xl mx-auto p-4 space-y-4">
            <input
                type="email"
                placeholder="Recipient Email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full border p-2"
            />
            <textarea
                placeholder="Enter prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full border p-2"
            />
            <button onClick={generate} className="bg-blue-500 text-white px-4 py-2">Generate Email</button>
            <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border p-2"
            />
            <textarea
                value={emailBody}
                placeholder="Email Body"
                onChange={(e) => setEmailBody(e.target.value)}
                className="w-full border p-2 h-40"
            />
            <button onClick={send} className="bg-green-500 text-white px-4 py-2">Send Email</button>

            <p className="text-center">
                <span className="text-blue-500 font-semibold">Note : </span>
                <span>{"You'll recieve an email from varisrajak.cse20@ggct.co.in"}</span>
            </p>
        </div>
    );
}
