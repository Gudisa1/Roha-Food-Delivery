import express from "express";
import { logout, register } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
const router = express.Router();

// Route for registering a new user
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
