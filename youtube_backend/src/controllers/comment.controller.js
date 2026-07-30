import mongoose from "mongoose";
import Video from "../models/Video.js";
import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
    const { videoId } = req.params
    const { text } = req.body;

    try {

        if (!mongoose.isValidObjectId(videoId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Video Id"
            });
        }

        if (!text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Text field required"
            });
        }

        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        const newComment = await Comment.create({
            text,
            owner: req.user._id,
            video: videoId
        });

        await newComment.populate("owner", "username avatar");

        return res.status(201).json({
            success: true,
            message: "Comment created successfully",
            newComment
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export const getAllComments = async (req, res) => {

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

        const comments = await Comment.find({
            video: videoId
        }).populate("owner", "username avatar").sort({ createdAt: -1 });

        if (comments.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No comments yet",
                comments: []
            });
        }
        return res.status(200).json({
            success: true,
            message: "Comments fetched successfully",
            comments
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}
