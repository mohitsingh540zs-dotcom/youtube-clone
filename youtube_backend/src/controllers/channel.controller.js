import User from "../models/User.js";
import Channel from "../models/Channel.js";
import mongoose from "mongoose";
import Video from "../models/Video.js";
import cloudinary from "../config/Cloudinary.js";
import fs from "fs";

export const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;

    // Validation
    if (!channelName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Channel name is required",
      });
    }

    // User already has a channel
    if (req.user.channel) {
      return res.status(409).json({
        success: false,
        message: "You already have a channel",
      });
    }

    // Channel name already taken
    const existingChannel = await Channel.findOne({ channelName });

    if (existingChannel) {
      return res.status(409).json({
        success: false,
        message: "Channel name already exists",
      });
    }

    let banner = "";

    // Upload banner if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "youtube_backend/channel_banners",
      });

      banner = result.secure_url;

      // Delete temp file
      fs.unlinkSync(req.file.path);
    }

    // Create channel
    const newChannel = await Channel.create({
      channelName,
      description,
      banner,
      owner: req.user._id,
    });

    // Save channel id in user
    req.user.channel = newChannel._id;
    await req.user.save();

    // Populate owner to return avatar & username
    const channel = await Channel.findById(newChannel._id).populate(
      "owner",
      "username avatar",
    );

    return res.status(201).json({
      success: true,
      message: "Channel created successfully",
      channel,
    });
  } catch (error) {
    // Delete temp file if upload failed midway
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch {}
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// channel getter controller
export const getChannel = async (req, res) => {
  const { id } = req.params;

  try {
    const channel = await Channel.findById(id).populate(
      "owner",
      "username avatar",
    );

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "channel doesn't exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Channel fetched successfully",
      channel,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid channel id",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// self channel getter controller
export const getMyChannel = async (req, res) => {
  try {
    if (!req.user.channel) {
      return res.status(404).json({
        success: false,
        message: "You haven't created a channel yet",
      });
    }

    const channel = await Channel.findById(req.user.channel).populate(
      "owner",
      "username avatar",
    );

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Channel fetched successfuly",
      channel,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid channel Id",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// channel updater controller
export const updateChannel = async (req, res) => {
  try {
    if (!req.user.channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not created yet",
      });
    }

    const channel = await Channel.findById(req.user.channel);

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    const { channelName, description } = req.body;

    // Validate channel name
    if (channelName !== undefined && !channelName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Channel name cannot be empty",
      });
    }

    // Update channel name
    if (channelName !== undefined) {
      channel.channelName = channelName.trim();
    }

    // Update description
    if (description !== undefined) {
      channel.description = description.trim();
    }

    // Upload banner if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "youtube_backend/channel_banners",
      });

      channel.banner = result.secure_url;

      // Delete temporary file
      fs.unlinkSync(req.file.path);
    }

    await channel.save();

    // Populate owner after saving
    await channel.populate("owner", "username avatar");

    return res.status(200).json({
      success: true,
      message: "Channel updated successfully",
      channel,
    });
  } catch (error) {
    // Delete temporary file if upload/save fails
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.log("Temp file cleanup failed:", err.message);
      }
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// channel deleter controller
export const deleteChannel = async (req, res) => {
  try {
    if (!req.user.channel) {
      return res.status(404).json({
        success: false,
        message: "You don't have a channel",
      });
    }

    const channel = await Channel.findByIdAndDelete(req.user.channel);
    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    req.user.channel = null;
    await req.user.save();

    return res.status(200).json({
      success: true,
      message: "Channel deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// search controller
export const searchChannel = async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Search query required",
      });
    }

    const channels = await Channel.find({
      channelName: {
        $regex: name,
        $options: "i",
      },
    })
      .populate("owner", "username avatar")
      .limit(15);

    if (channels.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No channel found",
        channels: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Channels found successfully",
      channels,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// get videos of channel controller
export const getVideosByChannel = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid channel id",
      });
    }

    const channel = await Channel.findById(id).populate(
      "owner",
      "username avatar",
    );

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    const videos = await Video.find({
      channel: id,
    })
      .populate("owner", "username avatar")
      .populate("channel", "channelName banner")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Channel fetched successfully",
      channel,
      videos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
