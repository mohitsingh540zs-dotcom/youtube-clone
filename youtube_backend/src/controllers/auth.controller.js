import User from "../models/User.js"
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js"

// register user controller
export const register = async (req, res) => {

    // destructure the values 
    const { username, email, password } = req.body;

    try {
        // existing user check
        const user = await User.findOne({ $or: [{ email }, { username }] });

        // if user exists then this will trigger and return already exists
        if (user) {
            return res.status(409).json({
                success: false,
                message: "Account already exists, Login please"
            });
        }
        // hash the password for security purpose
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user with the details
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // success response of successful creation
        return res.status(201).json({
            success: true,
            message: "User Registered Successfully"
        });

    } catch (error) {
        // error handler 
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}
// login user controller
export const login = async (req, res) => {
    // destruct the values from body
    const { username, email, password } = req.body;

    try {
        // find the existing user 
        const user = await User.findOne({ $and: [{ email }, { username }] }).select("+password");

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
        return res.status(200).json({
            success: true,
            message: `Login Successfull, Welcome back ${user.username}`
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