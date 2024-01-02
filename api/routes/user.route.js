import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyUser.middleware.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/update/:id", verifyToken, deleteUser);

export default router;
