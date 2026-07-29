import express from "express";
import { createChannel, deleteChannel, getChannel, getMyChannel, getVideosByChannel, searchChannel, updateChannel } from "../controllers/channel.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js"

const channelRoute = express.Router();

channelRoute.post('/create', isAuthenticated, createChannel);

channelRoute.get('/search', searchChannel);
channelRoute.get('/get-me', isAuthenticated, getMyChannel);
channelRoute.get('/:id/videos', getVideosByChannel);
channelRoute.get('/get/:id', getChannel);

channelRoute.patch('/update-me', isAuthenticated, updateChannel);
channelRoute.delete('/delete-me', isAuthenticated, deleteChannel);

export default channelRoute;