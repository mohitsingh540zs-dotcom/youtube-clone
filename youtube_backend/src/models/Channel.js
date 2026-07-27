import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    channelName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5,
        maxlength: 30
    },
    description: {
        type: String,
        trim: true,
        default: "",
        maxlength: 250
    },
    banner: {
        type: String,
        default: ""
    },
    subscribers: {
        type: Number,
        default: 0,
        min: 0
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model("Channel", channelSchema);