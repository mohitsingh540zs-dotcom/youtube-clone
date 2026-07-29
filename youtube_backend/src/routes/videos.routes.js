import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getVideoById, getVideos, uploadVideo } from "../controllers/video.controller.js";

const videoRoute = express.Router();

videoRoute.post('/upload', isAuthenticated, uploadVideo);
videoRoute.get('/getVideo', getVideos);
videoRoute.get('/getvideo/:id', getVideoById);

export default videoRoute;