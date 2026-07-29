import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { deleteVideo, getVideoById, getVideos, searchVideo, updateVideo, uploadVideo } from "../controllers/video.controller.js";

const videoRoute = express.Router();

videoRoute.post('/upload', isAuthenticated, uploadVideo);
videoRoute.get('/getVideo', getVideos);
videoRoute.get('/search', searchVideo);
videoRoute.get('/getvideo/:id', getVideoById);
videoRoute.patch('/update/:id', isAuthenticated, updateVideo);
videoRoute.delete('/delete/:id', isAuthenticated, deleteVideo);

export default videoRoute;