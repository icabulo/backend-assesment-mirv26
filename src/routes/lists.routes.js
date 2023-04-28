import express from "express";

const router = express.Router();

// Get all list of favorites
router.get("/", async (req, res) => {
  res.send("Get all list of favorites");
});

// Creates a new list of favorites
router.post("/", async (req, res) => {
  res.send("Creates a new list of favorites");
});

// Get a single list of favorites
router.get("/:id", async (req, res) => {
  res.send("Get a single list of favorites");
});

// Deletes a list of favorites
router.delete("/:id", async (req, res) => {
  res.send("Deletes a list of favorites");
});

export default router;
