import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  subscribe,
  subscribeStatus,
  unsubscribe,
} from "../controllers/subscription.controller.js";

const subcriptionRoute = express.Router();

subcriptionRoute.post("/subscribe/:channelId", isAuthenticated, subscribe);
subcriptionRoute.delete(
  "/unsubscribe/:channelId",
  isAuthenticated,
  unsubscribe,
);
subcriptionRoute.get("/getStatus/:channelId", isAuthenticated, subscribeStatus);

export default subcriptionRoute;
