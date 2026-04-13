"use client";
import { useState } from "react";
import { Button } from "@/components/ui";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    setStatus(res.ok ? "success" : "error");
  };
  if (status === "success") return <p className="text-brand-teal font-medium">Thanks for subscribing!</p>;
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 rounded-full border border-brand-navy/20 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal" />
      <Button type="submit" size="sm" disabled={status === "loading"}>{status === "loading" ? "..." : "Subscribe"}</Button>
    </form>
  );
}
