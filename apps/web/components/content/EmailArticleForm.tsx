"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type EmailFormProps = {
  article: {
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage?: any;
  };
  categorySlug: string;
  subcategorySlug: string;
};

export function EmailArticleForm({ article, categorySlug, subcategorySlug }: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/send-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          article: {
            title: article.title,
            slug: article.slug?.current,
            excerpt: article.excerpt,
            imageUrl: article.mainImage?.url, 
            url: `${window.location.origin}/${categorySlug}${subcategorySlug ? `/${subcategorySlug}` : ''}/${article.slug?.current}`
          }
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to send the email. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("A network error occurred. Please try again later.");
    }
  };

  return (
    <div className="my-10 bg-brand-orange/5 dark:bg-brand-orange/10 border border-brand-orange/20 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-xl font-display font-bold text-brand-navy dark:text-white mb-2">
            Save this article for later?
          </h3>
          <p className="text-brand-navy/70 dark:text-gray-400 text-sm md:text-base">
            We'll send a beautiful copy straight to your inbox so you never lose it.
          </p>
        </div>
        
        <div className="w-full md:w-auto shrink-0">
          {status === "success" ? (
            <div className="flex items-center justify-center space-x-2 bg-green-500/10 text-green-600 dark:text-green-400 font-bold px-6 py-4 rounded-xl border border-green-500/20">
              <CheckCircle2 className="w-5 h-5" />
              <span>Sent! Check your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                required
                disabled={status === "loading"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-xl border border-brand-navy/20 dark:border-white/10 bg-white dark:bg-brand-dark-card focus:outline-none focus:ring-2 focus:ring-brand-orange w-full sm:w-64 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center space-x-2 bg-brand-orange text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-orange/90 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Send</span>
                    <Send className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>
          )}
          
          {status === "error" && (
             <div className="mt-3 flex items-center space-x-1.5 text-red-500 text-sm font-semibold justify-center md:justify-start">
               <AlertCircle className="w-4 h-4" />
               <span>{message}</span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
