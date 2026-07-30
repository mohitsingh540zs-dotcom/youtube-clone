import express from "express";
import { createComment, deleteComment, getCommentsByVideo, updateComment } from "../controllers/comment.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js"

const commentRoute = express.Router();

commentRoute.post('/create/:videoId', isAuthenticated, createComment);
commentRoute.get('/:videoId', getCommentsByVideo);
commentRoute.patch('/update/:commentId', isAuthenticated, updateComment);
commentRoute.delete('/delete/:commentId', isAuthenticated, deleteComment);

export default commentRoute;