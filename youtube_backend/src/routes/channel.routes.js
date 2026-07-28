import express from "express";
import { createChannel, deleteChannel, getChannel, getMyChannel, updateChannel } from "../controllers/channel.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js"

const channelRoute = express.Router();

channelRoute.post('/create', isAuthenticated, createChannel);
channelRoute.get('/get/:id', getChannel);
channelRoute.get('/get-me', isAuthenticated, getMyChannel);
channelRoute.patch('/update-me', isAuthenticated, updateChannel);
channelRoute.delete('/delete-me',isAuthenticated, deleteChannel);

export default channelRoute;