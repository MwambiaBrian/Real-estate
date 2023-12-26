import express from "express";
import { google, signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/signup").post(signup);
router.post("/signin", signin);
router.post("/google", google);
export default router;
