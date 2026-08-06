import express from "express";
import { login, logout, me, register, updateAvatar } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../middleware/validator.js"
import isAuthenticated from "../middleware/isAuthenticated.js";
import upload from "../middleware/multer.js";

const authRoute = express.Router();

authRoute.post(
    "/register",
    upload.single("avatar"),
    registerValidator,
    register
);
authRoute.post('/login', loginValidator, login);
authRoute.get('/me', isAuthenticated, me);
authRoute.post('/logout', isAuthenticated, logout);
authRoute.put(
    "/avatar",
    isAuthenticated,
    upload.single("avatar"),
    updateAvatar
);

export default authRoute;