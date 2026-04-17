"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MessageSquare, Loader2 } from "lucide-react";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";

interface Comment {
  _id: string;
  name: string;
  text: string;
  likes: number;
  publishedAt: string;
  parentComment?: { _ref: string };
  replies?: Comment[];
}

interface CommentSectionProps {
  articleId: string;
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/comments?articleId=${articleId}`);
      if (!res.ok) throw new Error("Failed to load comments");
      
      const data = await res.json();
      
      // Nesting logic
      const commentMap = new Map();
      const roots: Comment[] = [];

      data.forEach((c: any) => {
        commentMap.set(c._id, { ...c, replies: [] });
      });

      commentMap.forEach((c: any) => {
        if (c.parentComment?._ref) {
          const parent = commentMap.get(c.parentComment._ref);
          if (parent) {
            parent.replies.push(c);
          } else {
            roots.push(c); // Orphaned reply treated as root
          }
        } else {
          roots.push(c);
        }
      });

      // Sort roots by date
      roots.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      
      setComments(roots);
    } catch (err) {
      console.error(err);
      setError("Unable to load the discussion. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const totalComments = comments.reduce((acc, curr) => acc + 1 + (curr.replies?.length || 0), 0);

  return (
    <section className="mt-20 border-t border-brand-navy/10 dark:border-white/10 pt-16">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="bg-brand-orange/10 p-3 rounded-2xl">
            <MessageSquare className="w-6 h-6 text-brand-orange" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy dark:text-white">
              Community Discussion
            </h2>
            <p className="text-sm text-brand-navy/50 dark:text-gray-400 font-medium">
              Join {totalComments} parent{totalComments !== 1 ? 's' : ''} sharing their thoughts
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <CommentForm articleId={articleId} title="Share your perspective" onSuccess={fetchComments} />
      </div>

      <div className="space-y-10">
        {isLoading ? (
          <div className="flex flex-col items-center py-12 text-brand-navy/30 dark:text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <p className="text-sm font-bold uppercase tracking-widest">Loading conversation...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 dark:bg-red-900/10 rounded-2xl p-8">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        ) : comments.length > 0 ? (
          <div className="flex flex-col gap-8">
            {comments.map((comment) => (
              <CommentItem 
                key={comment._id} 
                comment={comment} 
                articleId={articleId} 
                onCommentPosted={fetchComments}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-brand-navy/[0.02] dark:bg-white/[0.02] rounded-3xl border-2 border-dashed border-brand-navy/10 dark:border-white/10">
            <p className="text-brand-navy/40 dark:text-gray-500 text-lg italic">
              No comments yet. Be the first to start the conversation!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
