import express from "express";
import { createUser } from "../controllers/users.controllers.js";
import { login, generateToken } from "../middlewares/secureLogin.js";
import {
  validEmail,
  validPassword,
  passwordDoubleCheck,
  checkErrors,
} from "../middlewares/singupChecker.js";

const router = express.Router();

// Login user by email/password
router.post("/auth/local/login", login, generateToken);

// create a new user
router.post(
  "/singup",
  [validEmail(), validPassword(), passwordDoubleCheck()],
  checkErrors,
  createUser
);

export default router;
