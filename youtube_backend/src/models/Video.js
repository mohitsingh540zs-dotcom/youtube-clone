import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 150,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 2000,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    videoUrl: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      default: 0,
      min: 0,
    },

    category: {
      type: String,
      enum: [
        "Programming",
        "Entertainment",
        "Music",
        "Education",
        "Gaming",
        "Sports",
        "Travel",
        "Technology",
        "Lifestyle",
        "News",
      ],
      default: "Programming",
    },

    views: {
      type: Number,
      min: 0,
      default: 0,
    },

    likes: {
      type: Number,
      min: 0,
      default: 0,
    },

    dislikes: {
      type: Number,
      min: 0,
      default: 0,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("Video", videoSchema);
