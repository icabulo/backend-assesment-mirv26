import express from "express";
import { createItem } from "../controllers/items.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// creates an item for a list of favorites
router.post("/:idList", verifyToken, createItem);

export default router;
