import express from "express";
import {
  getAllLists,
  createList,
  findListById,
} from "../controllers/lists.controllers.js";

const router = express.Router();

// Get all list of favorites
router.get("/", getAllLists);

// Creates a new list of favorites
router.post("/", createList);

// Get a single list of favorites
router.get("/:id", findListById);

// Deletes a list of favorites
router.delete("/:id", async (req, res) => {
  res.send("Deletes a list of favorites");
});

export default router;
