import mongoose from "mongoose";
import fs from "fs";
import cloudinary from "../config/Cloudinary.js";
import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

export const uploadVideo = async (req, res) => {
    const { title, description, category, duration } = req.body;

    try {

        if (!req.user.channel) {
            return res.status(403).json({
                success: false,
                message: "Create a channel before uploading videos"
            });
        }

        if (!title || !description || !category || !duration) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (
            !req.files ||
            !req.files.thumbnail ||
            !req.files.video
        ) {
            return res.status(400).json({
                success: false,
                message: "Thumbnail and video are required"
            });
        }

        const thumbnailFile = req.files.thumbnail[0];
        const videoFile = req.files.video[0];

        const thumbnailUpload = await cloudinary.uploader.upload(
            thumbnailFile.path,
            {
                folder: "youtube_clone/thumbnails",
                resource_type: "image"
            }
        );

        const videoUpload = await cloudinary.uploader.upload(
            videoFile.path,
            {
                folder: "youtube_clone/videos",
                resource_type: "video"
            }
        );

        fs.unlinkSync(thumbnailFile.path);
        fs.unlinkSync(videoFile.path);

        const newVideo = await Video.create({
            title,
            description,
            category,
            duration: Math.round(videoUpload.duration),
            thumbnail: thumbnailUpload.secure_url,
            videoUrl: videoUpload.secure_url,
            owner: req.user._id,
            channel: req.user.channel
        });

        return res.status(201).json({
            success: true,
            message: "Video uploaded successfully",
            video: newVideo
        });

    } catch (error) {

        if (req.files?.thumbnail) {
            try {
                fs.unlinkSync(req.files.thumbnail[0].path);
            } catch { }
        }

        if (req.files?.video) {
            try {
                fs.unlinkSync(req.files.video[0].path);
            } catch { }
        }

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

export const getVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate("channel", "channelName banner subscribers").populate("owner", "username avatar").sort({ createdAt: -1 });

        if (videos.length === 0) {
            return res.status(200).json({
                success: true,
                videos: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "All videos fetched",
            videos
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export const getVideoById = async (req, res) => {
    const { id } = req.params;

    try {

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid video id"
            });
        }

        const video = await Video.findByIdAndUpdate(
            id,
            {
                $inc: {
                    views: 1
                }
            },
            {
                new: true
            }
        )
            .populate("owner", "username avatar")
            .populate("channel", "channelName banner subscribers");

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Video fetched successfully",
            video
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }
};

export const updateVideo = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid video id"
            });
        }

        const video = await Video.findById(id);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        // Authorization
        if (video.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this video"
            });
        }

        const allowedCategories = [
            "Programming",
            "Entertainment",
            "Music",
            "Education",
            "Gaming",
            "Sports",
            "Travel",
            "Technology",
            "Lifestyle",
            "News"
        ];

        if (req.body.title !== undefined) {
            video.title = req.body.title.trim();
        }

        if (req.body.description !== undefined) {
            video.description = req.body.description.trim();
        }

        if (req.body.category !== undefined) {
            if (!allowedCategories.includes(req.body.category)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid category"
                });
            }

            video.category = req.body.category;
        }

        await video.save();

        return res.status(200).json({
            success: true,
            message: "Video updated successfully",
            video
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

export const deleteVideo = async (req, res) => {

    const { id } = req.params;

    try {

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid video id"
            });
        }

        const video = await Video.findById(id);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: "Video not found"
            });
        }

        if (video.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await video.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Video deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }

};

export const searchVideo = async (req, res) => {
    const { title } = req.query;

    try {
        if (!title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Search Query needed"
            });
        }

        const videos = await Video.find({
            title: {
                $regex: title,
                $options: "i"
            }
        }).populate("channel", "channelName banner").sort({ createdAt: -1 });

        if (videos.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No videos found",
                videos: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Videos fetched successfully",
            videos
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export const categoryFilter = async (req, res) => {
    const { category } = req.params;

    try {
        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category needed"
            });
        }

        const allowedCategories = [
            "Education",
            "Gaming",
            "Music",
            "Sports",
            "Technology",
            "Entertainment",
            "General"
        ]
        const formattedCategory = category.trim();
        const normalisedCategory = formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1).toLowerCase();

        if (!allowedCategories.includes(normalisedCategory)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category"
            });
        }

        const videos = await Video.find({
            category: normalisedCategory
        }).populate("channel", "channelName banner").sort({ createdAt: -1 });

        if (videos.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No video found",
                videos: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Videos fetched successfully",
            videos
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export const getMyVideos = async (req, res) => {
    try {
        if (!req.user.channel) {
            return res.status(404).json({
                success: false,
                message: "You don't have a channel"
            });
        }

        const videos = await Video.find({
            channel: req.user.channel
        })
            .populate("channel", "channelName banner")
            .populate("owner", "username avatar")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Videos fetched successfully",
            videos
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};