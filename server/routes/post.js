import express from "express";
import { createPost, getPostOnCategory } from "../controllers/post.js"
import {
    PostValidator, BypassChatValidator
} from "../lib/validators.js";
import { BypassNewChat } from "../controllers/chat.js";

const app = express.Router();

app.post("/newpost", PostValidator, createPost);
app.get("/getpost/:category", getPostOnCategory);
app.post("/directchat", BypassChatValidator, BypassNewChat);

export default app;
