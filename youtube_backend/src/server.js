import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/DB.js";

dotenv.config();

const port = process.env.PORT || 5000;


const startServer = async () => {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`server is running on http://localhost:${port}`);
        });

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

startServer();

