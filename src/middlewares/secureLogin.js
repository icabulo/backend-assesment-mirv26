import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res, next) => {
  try {
    const { email: emailInput, password: passwordInput } = req.body;
    const userDb = await prisma.users.findUniqueOrThrow({
      where: {
        email: emailInput,
      },
    });

    const isValidUser = bcrypt.compareSync(passwordInput, userDb.password);

    if (isValidUser) {
      //injecting user ID in the body.
      req.body.userPayload = userDb.iduser;
      //generate token
      next();
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    if (error.code === "P2025") {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      res.status(500).json({ error: true });
    }
  }
};

//NOTE: token expiration set to 1 hour as default
export const generateToken = (req, res) => {
  try {
    const token = jwt.sign({ id: req.body.userPayload }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};
