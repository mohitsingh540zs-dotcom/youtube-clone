import express from "express";
import upload from "../middleware/multer.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

import {
  categoryFilter,
  deleteVideo,
  getMyVideos,
  getVideoById,
  getVideos,
  searchVideo,
  updateVideo,
  uploadVideo,
} from "../controllers/video.controller.js";

const videoRoute = express.Router();

// Upload Video
videoRoute.post(
  "/upload",
  isAuthenticated,
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  uploadVideo,
);

// Get All Videos
videoRoute.get("/getVideo", getVideos);

// Search Videos
videoRoute.get("/search", searchVideo);

// Get Single Video
videoRoute.get("/getvideo/:id", getVideoById);

// Category Filter
videoRoute.get("/category/:category", categoryFilter);

// Update Video
videoRoute.patch("/update/:id", isAuthenticated, updateVideo);

// Delete Video
videoRoute.delete("/delete/:id", isAuthenticated, deleteVideo);

videoRoute.get("/getMyVideos", isAuthenticated, getMyVideos);

export default videoRoute;
