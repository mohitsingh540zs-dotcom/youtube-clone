import mongoose from "mongoose";
import Channel from "../models/Channel.js";
import Subscription from "../models/Subscription.js";

export const subscribe = async (req, res) => {
  const { channelId } = req.params;

  try {
    // Validate channel id
    if (!mongoose.isValidObjectId(channelId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Channel Id",
      });
    }

    // Find channel
    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    // Can't subscribe to own channel
    if (channel.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Can't subscribe to your own channel",
      });
    }

    // Check existing subscription
    const subscribed = await Subscription.findOne({
      subscriber: req.user._id,
      channel: channelId,
    });

    if (subscribed) {
      return res.status(409).json({
        success: false,
        message: "Already subscribed",
      });
    }

    // Create subscription
    await Subscription.create({
      subscriber: req.user._id,
      channel: channelId,
    });

    // Increase subscriber count
    channel.subscribers += 1;
    await channel.save();

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      subscribers: channel.subscribers,
      subscribed: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const unsubscribe = async (req, res) => {
  const { channelId } = req.params;
  try {
    if (!mongoose.isValidObjectId(channelId)) {
      return res.status(400).json({
        success: false,
        message: "Channel Id Invalid",
      });
    }

    // find channel
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    const subscription = await Subscription.findOne({
      subscriber: req.user._id,
      channel: channelId,
    });

    if (!subscription) {
      return res.status(400).json({
        success: false,
        message: "You haven't subscribed to this channel",
      });
    }

    await subscription.deleteOne();

    channel.subscribers = Math.max(0, channel.subscribers - 1);

    await channel.save();

    return res.status(200).json({
      success: true,
      message: "Unsubscribed successfully",
      subscribers: channel.subscribers,
      subscribed: false,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const subscribeStatus = async (req, res) => {
  const { channelId } = req.params;
  try {
    if (!mongoose.isValidObjectId(channelId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Channel Id",
      });
    }

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Channel not found",
      });
    }

    const subscription = await Subscription.findOne({
      subscriber: req.user._id,
      channel: channelId,
    });

    return res.status(200).json({
      success: true,
      message: "Success",
      subscribers: channel.subscribers,
      subscribed: !!subscription,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
