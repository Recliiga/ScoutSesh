"use server";
import connectDB from "@/db/connectDB";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Comment, { CommentSchemaType } from "@/db/models/Comment";

export async function postComment(text: string) {
  const cookieStore = await cookies();

  try {
    // Get token from cookie
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Invalid token");

    // Verify token and get userId
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof payload === "string") throw new Error("Invalid token");
    const userId = payload.userId;

    // connect to MongoDB and create new Comment
    await connectDB();
    const comment: CommentSchemaType = await Comment.create({
      text,
      author: userId,
    });

    // Fetch the new Comment posted and populate the author field
    const newComment: CommentSchemaType = JSON.parse(
      JSON.stringify(await Comment.findById(comment._id).populate("author"))
    );
    return { newComment, error: null };
  } catch (error) {
    return { newComment: null, error: (error as Error).message };
  }
}
