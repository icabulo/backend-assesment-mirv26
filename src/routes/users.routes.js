import express from "express";
import {
  login,
  generateToken,
  createUser,
} from "../controllers/users.controllers.js";
import {
  validEmail,
  validPassword,
  checkErrors,
} from "../middlewares/validUser.js";

const router = express.Router();

// Login user by email/password
router.post("/auth/local/login", login, generateToken);

// create a new user
router.post(
  "/singup",
  [validEmail(), validPassword()],
  checkErrors,
  createUser
);

export default router;
