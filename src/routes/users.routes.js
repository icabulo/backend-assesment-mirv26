import express from "express";
import { createUser } from "../controllers/users.controllers.js";
import { login, generateToken } from "../middlewares/secureLogin.js";
import { signupValidator } from "../middlewares/signupChecker.js";

const router = express.Router();

// Login user by email/password
router.post("/auth/local/login", login, generateToken);

// create a new user
router.post("/signup", signupValidator, createUser);

export default router;
