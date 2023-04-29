import express from "express";
import {
  getAllLists,
  createList,
  findListById,
  deleteListById,
} from "../controllers/lists.controllers.js";

const router = express.Router();

// Get all list of favorites
router.get("/", getAllLists);

// Creates a new list of favorites
router.post("/", createList);

// Get a single list of favorites
router.get("/:id", findListById);

// Deletes a list of favorites
// NOTE: cascade delete is enable in the schema model:
// CAUTION: if a list is deleted then all its items are deleted too.
router.delete("/:id", deleteListById);

export default router;
