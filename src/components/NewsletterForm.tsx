"use client";

import { useState } from "react";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://buttondown.email/api/emails/embed-subscribe/propcoupouns", {
        method: "POST",
        body: new URLSearchParams({ email }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <p className="text-[#00ff9d] text-2xl font-bold">Welcome aboard!</p>
        <p className="text-gray-400 mt-2">Check your inbox — your first deals drop Tuesday</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@trader.com"
        required
        disabled={status === "loading"}
        className="flex-1 px-6 py-4 rounded-xl bg-[#111] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff9d] transition"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-10 py-4 bg-[#00ff9d] hover:bg-[#00cc7a] text-black font-bold rounded-xl transition shadow-lg hover:shadow-xl disabled:opacity-70"
      >
        {status === "loading" ? "Subscribing..." : "Send Me Deals"}
      </button>
    </form>
  );
};