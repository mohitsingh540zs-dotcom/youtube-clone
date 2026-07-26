import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.get('/health', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is running successfully"
    });
});

export default app;