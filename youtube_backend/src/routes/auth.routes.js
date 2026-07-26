import express from "express";
import { login, logout, me, register } from "../controllers/auth.controller.js";
import { authValidator } from "../middleware/validator.js"
import isAuthenticated from "../middleware/isAuthenticated.js";

const authRoute = express.Router();

authRoute.post('/register', authValidator, register);
authRoute.post('/login', authValidator, login);
authRoute.get('/me', isAuthenticated, me);
authRoute.post('/logout', isAuthenticated, logout);

export default authRoute;