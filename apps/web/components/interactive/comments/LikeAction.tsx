"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface LikeActionProps {
  id: string;
  type: "article" | "comment";
  initialLikes?: number;
  className?: string;
  showCount?: boolean;
}

export function LikeAction({ id, type, initialLikes = 0, className, showCount = true }: LikeActionProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Storage key to prevent multiple likes from same browser
  const storageKey = `liked_${type}_${id}`;

  useEffect(() => {
    const hasLiked = localStorage.getItem(storageKey);
    if (hasLiked) setIsLiked(true);
  }, [storageKey]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;

    const action = isLiked ? "dec" : "inc";
    const nextIsLiked = !isLiked;
    const nextLikes = isLiked ? Math.max(0, likes - 1) : likes + 1;

    // Optimistic Update
    setIsLiked(nextIsLiked);
    setLikes(nextLikes);
    
    if (nextIsLiked) {
      localStorage.setItem(storageKey, "true");
    } else {
      localStorage.removeItem(storageKey);
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type, action }),
      });

      if (!res.ok) throw new Error("Failed to update like");
      
      const data = await res.json();
      setLikes(data.likes);
    } catch (error) {
      console.error("Like error:", error);
      // Rollback on error
      setIsLiked(isLiked);
      setLikes(likes);
      if (isLiked) {
        localStorage.setItem(storageKey, "true");
      } else {
        localStorage.removeItem(storageKey);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={cn(
        "group flex items-center gap-1.5 transition-all duration-300",
        isLiked ? "text-brand-orange scale-110" : "text-brand-navy/40 dark:text-gray-500 hover:text-brand-orange",
        isLoading && "opacity-50 cursor-not-allowed text-brand-navy/20",
        className
      )}
    >
      <Heart 
        className={cn(
          "w-4 h-4 transition-transform duration-300",
          isLiked ? "fill-current" : "group-hover:scale-110 active:scale-95"
        )} 
      />
      {showCount && (
        <span className="text-xs font-bold font-display tracking-wider">
          {likes}
        </span>
      )}
    </button>
  );
}
