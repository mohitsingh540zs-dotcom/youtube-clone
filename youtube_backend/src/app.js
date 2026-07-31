import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import channelRoute from "./routes/channel.routes.js";
import videoRoute from "./routes/videos.routes.js";
import commentRoute from "./routes/comment.routes.js";
import likeRoute from "./routes/like.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use('/auth', authRoute);
app.use('/channel', channelRoute);
app.use('/videos', videoRoute);
app.use('/comment', commentRoute);
app.use('/like', likeRoute);


app.get('/health', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is running successfully"
    });
});

export default app;