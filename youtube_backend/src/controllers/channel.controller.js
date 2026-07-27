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