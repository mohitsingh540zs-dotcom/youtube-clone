import express from "express";
import { createChannel, getChannel } from "../controllers/channel.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js"

const channelRoute = express.Router();

channelRoute.post('/create', isAuthenticated, createChannel);
channelRoute.get('/get/:id', getChannel);

export default channelRoute;