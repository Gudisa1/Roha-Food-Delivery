import express from "express";
const router = express.Router();
import { deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

router.delete("/:id", verifyToken, deleteUser);

export default router;
