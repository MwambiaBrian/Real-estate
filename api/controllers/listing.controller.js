import asyncHandler from "express-async-handler";
import Listing from "../models/listing.model.js";

export const createListing = asyncHandler(async (req, res) => {
  const listing = await Listing.create(req.body);
  return res.status(201).json(listing);
});
export const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(404);
    return new Error("Listing not found");
  }
  if (req.params.id !== listing.userRef) {
    res.status(401);
    return new Error("You can only delete your own listing");
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("listing has been deleted");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
export const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(404);
    return new Error("Listing not found");
  }
  if (req.params.id !== listing.userRef) {
    res.status(401);
    return new Error("You can only update your own listing");
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
