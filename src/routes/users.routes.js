import express from "express";
import {
  login,
  generateToken,
  createUser,
} from "../controllers/users.controllers.js";

const router = express.Router();

// Login user by email/password
router.post("/auth/local/login", login, generateToken);

router.post("/singup", createUser);

export default router;
