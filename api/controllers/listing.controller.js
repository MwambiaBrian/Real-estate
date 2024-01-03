import asyncHandler from "express-async-handler";
import Listing from "../models/listing.model.js";

export const createListing = asyncHandler(async (req, res) => {
  const listing = await Listing.create(req.body);
  return res.status(201).json(listing);
});
