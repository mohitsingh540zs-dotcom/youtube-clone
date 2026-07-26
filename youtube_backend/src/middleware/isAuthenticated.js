import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isAuthenticated = async (req, res, next) => {

    try {
        // getting the token from the cookies
        const token = req.cookies.accessToken;

        // token validation 
        if (!token) {
            return res.status(403).json({
                success: false,
                message: "Token is missing or invalid"
            });
        }

        // verification of token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        //finding the user after verified succesfully 
        const user = await User.findById(decoded.userId);

        //if user not found this will trigger
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // giving the user to the req object with user property
        req.user = user;

        // calling next middleware or controller 
        next();

    } catch (error) {
        // token expiry error handler
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "access token expired"
            });
        }

        // jwt expiry error handler
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid access token"
            });
        }

        // basic internal server error handler
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export default isAuthenticated