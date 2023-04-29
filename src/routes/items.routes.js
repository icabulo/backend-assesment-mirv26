import express from "express";
import { createItem } from "../controllers/items.controllers.js";

const router = express.Router();

// creates an item for a list of favorites
router.post("/:idList", createItem);

export default router;
