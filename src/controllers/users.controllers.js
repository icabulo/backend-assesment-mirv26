import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = bcrypt.hashSync(password, 12);
    const newUser = await prisma.users.create({
      data: { email, password: hash },
    });
    res.status(201).json(newUser);
  } catch (error) {
    //error P2002: email is already in use
    if (error.code === "P2002") {
      res.status(401).json({ error: error.meta.target });
    } else {
      res.status(500).json({ error: true });
    }
  }
};

/* export const generateToken = (req, res) => {
  try {
    const token = jwt.sign({ id: req.body.userPayload }, process.env.SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

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
 */
