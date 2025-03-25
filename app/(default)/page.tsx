import EmailForm from "@/components/EmailForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">AI Mail Generator</h1>
      <EmailForm />
    </main>
  );
}
