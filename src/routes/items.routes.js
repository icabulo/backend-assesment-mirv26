import express from "express";

const router = express.Router();

// creates an item for a list of favorites
router.post("/:idList", async (req, res) => {
  res.send("Creating item in the list of FAVS");
});

export default router;
