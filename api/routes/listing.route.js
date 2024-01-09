import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../middlewares/verifyUser.middleware.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("delete/:id", verifyToken, deleteListing);

router.put("/update/:id", updateListing);
export default router;
