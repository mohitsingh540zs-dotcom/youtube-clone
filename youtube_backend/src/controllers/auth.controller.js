import User from "../models/User.js"
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js"
import fs from "fs";
import cloudinary from "../config/Cloudinary.js";

// register user controller

export const register = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Account already exists, Login please"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let avatar = "";

        if (req.file) {

            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "youtube_backend/avatars",
                    resource_type: "image",
                });

                avatar = result.secure_url;

                fs.unlinkSync(req.file.path);
            } catch (err) {
                console.error("UPLOAD ERROR:");
                console.dir(err, { depth: null });

                throw err;
            }
        }

        await User.create({
            username,
            email,
            password: hashedPassword,
            avatar
        });

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully"
        });

    } catch (error) {
        // If upload succeeded but something later failed,
        // also clean up the temp file.
        if (req.file) {
            try {
                fs.unlinkSync(req.file.path);
            } catch { }
        }
        console.error(error);
        console.error(error.message);
        console.error(error.http_code);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }
};
// login user controller
export const login = async (req, res) => {
    // destruct the values from body
    const { email, password } = req.body;

    try {
        // find the existing user 
        const user = await User.findOne({ email }).select("+password");

        // if user not exists this will returns the message with register first
        if (!user) {
            return res.status(404).json(
                { success: false, message: "Please register first" }
            );
        }

        // comparing the encrypted password and provided password
        const isMatch = await bcrypt.compare(password, user.password);

        // if invalid password this will return with msg invalid credentials
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "invalid credentials"
            });
        }

        // after all successful steps create a jwt token
        const accessToken = generateToken(user._id);

        // setting the cookies 
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        // returning the success message
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return res.status(200).json({
            success: true,
            message: `Login Successful, Welcome back ${user.username}`,
            user: userWithoutPassword,
        });
    } catch (error) {
        // error handler
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}
// /me only authenticated can use this
export const me = (req, res) => {
    // gives the current logged in user's details
    return res.status(200).json({
        success: true,
        message: "User's details",
        user: req.user
    });
}
//logout user controller
export const logout = (req, res) => {
    // clearing the stored cookie as same as setted
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
    });

    // returning the success response
    return res.status(200).json({
        success: true,
        message: "User logged out successfully"
    });
}
// updateAvatar controller
export const updateAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an avatar"
            });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "youtube_backend/avatars",
            resource_type: "image",
        });

        fs.unlinkSync(req.file.path);

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                avatar: result.secure_url
            },
            {
                new: true
            }
        ).select("-password");

        return res.status(200).json({
            success: true,
            message: "Avatar updated successfully",
            user
        });

    } catch (error) {

        if (req.file) {
            try {
                fs.unlinkSync(req.file.path);
            } catch { }
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};