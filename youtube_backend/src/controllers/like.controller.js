import mongoose from "mongoose";
import Video from "../models/Video.js"
import Like from "../models/Like.js";

export const createLike = async (req, res) => {
    const { videoId } = req.params;

    try {
        if (!mongoose.isValidObjectId(videoId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid video id"
            });
        }

        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        const isLiked = await Like.findOne({
            user: req.user._id,
            video: videoId
        });

        if (isLiked) {
            return res.status(409).json({
                success: false,
                message: "Video already liked"
            });
        }

        await Like.create({
            user: req.user._id,
            video: videoId
        });

        video.likes += 1;
        await video.save();

        return res.status(201).json({
            success: true,
            message: "Video liked successfully",
            liked: true,
            likes: video.likes
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

export const unlike = async (req, res) => {

    const { videoId } = req.params;

    try {

        if (!mongoose.isValidObjectId(videoId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Video Id"
            });
        }

        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        const like = await Like.findOne({
            user: req.user._id,
            video: videoId
        });

        if (!like) {
            return res.status(404).json({
                success: false,
                message: "Video not liked"
            });
        }

        await like.deleteOne();

        video.likes = Math.max(0, video.likes - 1);
        await video.save();

        return res.status(200).json({
            success: true,
            message: "Video unliked successfully",
            liked: false,
            likes: video.likes
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export const getLikeStatus = async (req, res) => {
    const { videoId } = req.params;

    try {
        if (!mongoose.isValidObjectId(videoId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Video Id"
            });
        }

        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        const like = await Like.findOne({
            user: req.user._id,
            video: videoId
        });

        return res.status(200).json({
            success: true,
            message: "Like status fetched successfully",
            likes: video.likes,
            liked: !!like
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};