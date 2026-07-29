import mongoose from "mongoose";
import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

export const uploadVideo = async (req, res) => {
    const { title, description, thumbnail, videoUrl, duration, category } = req.body;

    try {

        if (!req.user.channel) {
            return res.status(403).json({
                success: false,
                message: "Create a channel before uploading videos"
            });
        }

        if (!title || !description || !thumbnail || !videoUrl || duration === undefined
            || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newVideo = await Video.create({
            title,
            description,
            thumbnail,
            videoUrl,
            duration,
            category,
            channel: req.user.channel
        });

        return res.status(201).json({
            success: true,
            message: "Video uploaded successfully",
            video: newVideo
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }
};

export const getVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate("channel", "channelName banner").sort({ createdAt: -1 });

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
                message: "Invalid Video Id"
            });
        }

        const video = await Video.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        ).populate("channel", "channelName banner");

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
}
