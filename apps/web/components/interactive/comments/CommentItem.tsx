"use client";

import React, { useState } from "react";
import { MessageCircle, Reply, Pencil, X, Trash2 } from "lucide-react";
import { LikeAction } from "./LikeAction";
import { CommentForm } from "./CommentForm";
import { cn } from "@/lib/utils/cn";

interface Comment {
  _id: string;
  name: string;
  text: string;
  likes: number;
  publishedAt: string;
  isDeleted?: boolean;
  parentComment?: { _ref: string };
  replies?: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  articleId: string;
  onCommentPosted: () => void;
  isReply?: boolean;
}

export function CommentItem({ comment, articleId, onCommentPosted, isReply = false }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [editToken, setEditToken] = useState<string | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem(`edit_token_${comment._id}`);
    const postedAt = new Date(comment.publishedAt).getTime();
    const editWindowMs = 24 * 60 * 60 * 1000;
    const isExpired = Date.now() > postedAt + editWindowMs;
    
    if (token && !isExpired && !comment.isDeleted) {
      setCanEdit(true);
      setEditToken(token);
    }
  }, [comment._id, comment.publishedAt, comment.isDeleted]);

  const handleDelete = async () => {
    if (!editToken) return;
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      setIsDeleting(true);
      const res = await fetch("/api/comments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentId: comment._id,
          editToken,
        }),
      });

      if (!res.ok) throw new Error("Failed to delete comment");
      
      onCommentPosted();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete comment. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };

  return (
    <div className={cn("flex flex-col gap-4", isReply && "ml-6 md:ml-12 border-l-2 border-brand-navy/5 dark:border-white/5 pl-4 md:pl-6")}>
      <div className={cn(
        "bg-white dark:bg-brand-dark-card border border-brand-navy/5 dark:border-white/5 rounded-2xl p-5 md:p-6 shadow-sm transition-all",
        comment.isDeleted ? "opacity-60 bg-brand-navy/5 dark:bg-white/5" : "hover:shadow-md"
      )}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg",
              comment.isDeleted ? "bg-gray-200 dark:bg-gray-800 text-gray-400" : "bg-brand-teal/10 text-brand-teal"
            )}>
              {comment.isDeleted ? "?" : comment.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className={cn(
                "font-display font-bold leading-tight",
                comment.isDeleted ? "text-gray-400" : "text-brand-navy dark:text-white"
              )}>
                {comment.isDeleted ? "[Deleted]" : comment.name}
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/30 dark:text-gray-500">
                {formatDate(comment.publishedAt)}
              </span>
            </div>
          </div>
          {!comment.isDeleted && <LikeAction id={comment._id} type="comment" initialLikes={comment.likes} />}
        </div>

        {isEditing ? (
          <CommentForm
            articleId={articleId}
            commentId={comment._id}
            editToken={editToken || ""}
            initialText={comment.text}
            isEdit={true}
            onSuccess={() => {
              setIsEditing(false);
              onCommentPosted();
            }}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <p className={cn(
              "text-sm md:text-base leading-relaxed whitespace-pre-wrap",
              comment.isDeleted ? "text-gray-400 italic" : "text-brand-navy/80 dark:text-gray-300"
            )}>
              {comment.text}
            </p>

            {!comment.isDeleted && (
              <div className="mt-4 flex items-center gap-4">
                <button 
                  onClick={() => {
                    setShowReplyForm(!showReplyForm);
                    setIsEditing(false);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-teal hover:text-brand-teal/80 transition-colors"
                >
                  <Reply className="w-3 h-3" />
                  Reply
                </button>

                {canEdit && (
                  <>
                    <button 
                      onClick={() => {
                        setIsEditing(true);
                        setShowReplyForm(false);
                      }}
                      className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#BD552A] hover:opacity-80 transition-opacity"
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>
                    <button 
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-500 hover:opacity-80 transition-opacity disabled:opacity-50"
                    >
                      <Trash2 className="w-3 h-3" />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {showReplyForm && (
        <div className="ml-6 md:ml-12">
          <CommentForm 
            articleId={articleId} 
            parentCommentId={comment._id}
            title={`Reply to ${comment.name}`}
            onSuccess={() => {
              setShowReplyForm(false);
              onCommentPosted();
            }}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="flex flex-col gap-4">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply._id} 
              comment={reply} 
              articleId={articleId} 
              onCommentPosted={onCommentPosted}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
