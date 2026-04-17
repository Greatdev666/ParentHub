import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity/write-client";

export async function POST(req: Request) {
  try {
    const { name, text, articleId, parentCommentId } = await req.json();

    if (!name || !text || !articleId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const editToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

    // Prepare comment document
    const commentDoc = {
      _type: "comment",
      name: name.slice(0, 50),
      text,
      editToken, // Save the secret token
      article: {
        _type: "reference",
        _ref: articleId,
      },
      ...(parentCommentId && {
        parentComment: {
          _type: "reference",
          _ref: parentCommentId,
        },
      }),
      likes: 0,
      publishedAt: new Date().toISOString(),
      isApproved: true,
    };

    const result = await writeClient.create(commentDoc);

    return NextResponse.json({ 
      success: true, 
      comment: result,
      editToken // Return token to client to save in localStorage
    });
  } catch (error) {
    console.error("Comment submission error:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { commentId, text, editToken } = await req.json();

    if (!commentId || !text || !editToken) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Fetch the existing comment to verify token AND 24h limit
    const existingComment = await writeClient.fetch(
      `*[_type == "comment" && _id == $commentId][0]`,
      { commentId }
    );

    if (!existingComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // 2. Validate Token
    if (existingComment.editToken !== editToken) {
      return NextResponse.json({ error: "Unauthorized: Invalid edit token" }, { status: 403 });
    }

    // 3. Validate 24h Window
    const postedAt = new Date(existingComment.publishedAt).getTime();
    const now = new Date().getTime();
    const hoursSincePost = (now - postedAt) / (1000 * 60 * 60);

    if (hoursSincePost > 24) {
      return NextResponse.json({ error: "Edit window expired (24h limit)" }, { status: 403 });
    }

    // 4. Update the text
    const result = await writeClient
      .patch(commentId)
      .set({ text })
      .commit();

    return NextResponse.json({ success: true, comment: result });
  } catch (error) {
    console.error("Comment edit error:", error);
    return NextResponse.json({ error: "Failed to edit comment" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { commentId, editToken } = await req.json();

    if (!commentId || !editToken) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Fetch current comment AND any children
    const commentWithChildren = await writeClient.fetch(
      `{
        "comment": *[_type == "comment" && _id == $commentId][0],
        "replyCount": count(*[_type == "comment" && parentComment._ref == $commentId])
      }`,
      { commentId }
    );

    const existingComment = commentWithChildren.comment;
    const hasReplies = commentWithChildren.replyCount > 0;

    if (!existingComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // 2. Validate Token
    if (existingComment.editToken !== editToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 3. Validate 24h Window
    const postedAt = new Date(existingComment.publishedAt).getTime();
    const now = new Date().getTime();
    if ((now - postedAt) / (1000 * 60 * 60) > 24) {
      return NextResponse.json({ error: "Deletion window expired" }, { status: 403 });
    }

    // 4. Perform Delete Strategy
    if (hasReplies) {
      // SOFT DELETE: Transform to placeholder to keep thread intact
      await writeClient
        .patch(commentId)
        .set({ 
          isDeleted: true,
          text: "[Deleted]" 
        })
        .commit();
    } else {
      // HARD DELETE: No replies to protect, remove document entirely
      await writeClient.delete(commentId);
    }

    return NextResponse.json({ success: true, strategy: hasReplies ? "soft" : "hard" });
  } catch (error) {
    console.error("Comment delete error:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const articleId = searchParams.get("articleId");

    if (!articleId) {
      return NextResponse.json({ error: "Missing articleId" }, { status: 400 });
    }

    // Fetch comments for this article, sorted by latest first
    const comments = await writeClient.fetch(
      `*[_type == "comment" && article._ref == $articleId && isApproved == true] | order(publishedAt desc) {
        _id, name, text, likes, publishedAt, parentComment, isDeleted
      }`,
      { articleId }
    );

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Comment fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}
