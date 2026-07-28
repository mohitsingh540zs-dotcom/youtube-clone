import Channel from "../models/Channel";

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

