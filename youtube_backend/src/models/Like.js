import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

likeSchema.index(
    { user: 1, video: 1 },
    { unique: true }
);

export default mongoose.model("Like", likeSchema);