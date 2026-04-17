"use client";

import React, { useState, useEffect } from "react";
import { Send, User } from "lucide-react";

interface CommentFormProps {
  articleId: string;
  parentCommentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  title?: string;
  // Edit support
  initialText?: string;
  commentId?: string;
  editToken?: string;
  isEdit?: boolean;
}

export function CommentForm({ 
  articleId, 
  parentCommentId, 
  onSuccess, 
  onCancel, 
  title,
  initialText = "",
  commentId,
  editToken,
  isEdit = false
}: CommentFormProps) {
  const [name, setName] = useState("");
  const [text, setText] = useState(initialText);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    const savedName = localStorage.getItem("commenter_name");
    if (savedName) setName(savedName);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (!isEdit && !name.trim()) return;

    try {
      setIsSubmitting(true);
      setError(null);

      if (isEdit) {
        // PATCH for Editing
        const res = await fetch("/api/comments", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            commentId,
            text: text.trim(),
            editToken,
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to edit comment");
        }
      } else {
        // POST for New Comment
        const res = await fetch("/api/comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            text: text.trim(),
            articleId,
            parentCommentId
          }),
        });

        if (!res.ok) throw new Error("Failed to post comment");
        
        const data = await res.json();
        
        // SAVE the ownership token for the new comment
        if (data.editToken) {
          localStorage.setItem(`edit_token_${data.comment._id}`, data.editToken);
        }

        if (rememberMe) {
          localStorage.setItem("commenter_name", name.trim());
        } else {
          localStorage.removeItem("commenter_name");
        }
        setText("");
      }

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-brand-navy/5 dark:bg-white/5 p-6 rounded-2xl border border-brand-navy/5 dark:border-white/5">
      {title && (
        <h4 className="text-sm font-black uppercase tracking-widest text-[#BD552A] mb-4">
          {title}
        </h4>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/30 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-white dark:bg-brand-dark-card border border-brand-navy/10 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-teal transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-2 px-2">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 accent-brand-teal"
          />
          <label htmlFor="rememberMe" className="text-xs text-brand-navy/50 dark:text-gray-400 cursor-pointer">
            Remember me
          </label>
        </div>
      </div>

      <textarea
        placeholder="Write your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        rows={4}
        className="w-full bg-white dark:bg-brand-dark-card border border-brand-navy/10 dark:border-white/10 rounded-xl p-4 text-sm focus:ring-2 focus:ring-brand-teal transition-all outline-none resize-none"
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-sm font-bold text-brand-navy/50 dark:text-gray-400 hover:text-brand-navy dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-brand-teal hover:bg-brand-teal/90 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-brand-teal/20"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
          {!isSubmitting && <Send className="w-4 h-4" />}
        </button>
      </div>
    </form>
  );
}
