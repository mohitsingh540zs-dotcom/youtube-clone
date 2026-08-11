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
            text: text.trim(),
            owner: req.user._id,
            video: videoId
        });

        await newComment.populate("owner", "username avatar");

        return res.status(201).json({
            success: true,
            message: "Comment created successfully",
            comment: newComment
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export const getCommentsByVideo = async (req, res) => {

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
            length: comments.length,
            comments
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;


    try {

        if (!mongoose.isValidObjectId(commentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Comment Id"
            });
        }
        if (!text?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Comment Text required"
            });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment doesn't exists"
            });
        }

        if (comment.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to do this."
            });
        }

        comment.text = text.trim();
        await comment.save();

        await comment.populate("owner", "username avatar");

        return res.status(200).json({
            success: true,
            message: "Comment updated Successfully",
            comment
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }

}

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        if (!mongoose.isValidObjectId(commentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Comment Id"
            });
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        if (comment.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to do this."
            });
        }

        await comment.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}