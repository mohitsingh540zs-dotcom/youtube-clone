import User from "../models/User.js"
import Channel from "../models/Channel.js"

// channel creater controller
export const createChannel = async (req, res) => {
    try {
        // get the value first from body
        const { channelName, description, banner } = req.body;

        if (!channelName) {
            return res.status(400).json({
                success: false,
                message: "Channel name required"
            });
        }

        if (req.user.channel) {
            return res.status(409).json({
                success: false,
                message: "Channel already exists"
            });
        }

        const existingCName = await Channel.findOne({ channelName });
        if (existingCName) {
            return res.status(409).json({
                success: false,
                message: "Channel name already exists"
            });
        }

        const newChannel = await Channel.create({
            channelName,
            description,
            banner,
            owner: req.user._id
        });

        req.user.channel = newChannel._id;
        await req.user.save();

        return res.status(201).json({
            success: true,
            message: "Channel created successfully",
            channel: newChannel
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

// channel getter controller
export const getChannel = async (req, res) => {
    const { id } = req.params;

    try {
        const channel = await Channel.findById(id).populate("owner", "username avatar");

        if (!channel) {
            return res.status(404).json({
                success: false,
                message: "channel doesn't exists"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Channel fetched successfully",
            channel
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid channel id"
            });
        }
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

// self channel getter controller
export const getMyChannel = async (req, res) => {

    try {
        if (!req.user.channel) {
            return res.status(404).json({
                success: false,
                message: "You haven't created a channel yet"
            });
        }

        const channel = await Channel.findById(req.user.channel).
            populate("owner", "username avatar");

        if (!channel) {
            return res.status(404).json({
                success: false,
                message: "Channel not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Channel fetched successfuly",
            channel
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid channel Id"
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

// channel updater controller 
export const updateChannel = async (req, res) => {
    try {
        if (!req.user.channel) {
            return res.status(404).json({
                success: false,
                message: "Channel not created yet"
            });
        }

        const channel = await Channel.findById(req.user.channel).
            populate("owner", "username avatar");

        if (!channel) {
            return res.status(404).json({
                success: false,
                message: "Channel not found"
            });
        }

        const allowedFields = ["channelName", "description", "banner"];

        Object.keys(req.body).forEach(key => {
            if (allowedFields.includes(key)) {
                channel[key] = req.body[key];
            }
        });

        await channel.save();

        return res.status(200).json({
            success: true,
            message: "Updated successfully",
            channel
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

// channel deleter controller
export const deleteChannel = async (req, res) => {
    try {
        if (!req.user.channel) {
            return res.status(404).json({
                success: false,
                message: "You don't have a channel"
            });
        }

        const channel = await Channel.findByIdAndDelete(req.user.channel);
        if (!channel) {
            return res.status(404).json({
                success: false,
                message: "Channel not found"
            });
        }

        req.user.channel = null;
        await req.user.save();

        return res.status(200).json({
            success: true,
            message: "Channel deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

// search controller
export const searchChannel = async (req, res) => {
    const { name } = req.query;

    try {
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Search query required"
            });
        }

        const channels = await Channel.find({
            channelName: {
                $regex: name,
                $options: "i"
            }
        }).populate("owner", "username avatar").limit(15);

        if (channels.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No channel found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Channels found successfully",
            channels
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}