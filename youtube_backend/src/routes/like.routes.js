import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createLike, unlike, getLikeStatus } from "../controllers/like.controller.js";

const likeRoute = express.Router();

likeRoute.post("/:videoId", isAuthenticated, createLike);
likeRoute.delete("/:videoId", isAuthenticated, unlike);
likeRoute.get("/:videoId", isAuthenticated, getLikeStatus);

export default likeRoute;