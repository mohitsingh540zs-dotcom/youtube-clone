import express from "express";
import { createChannel, getChannel, getMyChannel, updateChannel } from "../controllers/channel.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js"

const channelRoute = express.Router();

channelRoute.post('/create', isAuthenticated, createChannel);
channelRoute.get('/get/:id', getChannel);
channelRoute.get('/get-me', isAuthenticated, getMyChannel);
channelRoute.patch('/update-me', isAuthenticated, updateChannel);

export default channelRoute;