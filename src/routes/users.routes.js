import express from "express";

const router = express.Router();

// Login user by email/password
router.post("/", async (req, res) => {
  res.send("Login user by email/password");
});

export default router;
