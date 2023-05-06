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
    res.status(201).json({
      message: "user created",
      userID: newUser.iduser,
      userEmail: newUser.email,
    });
  } catch (error) {
    //error P2002: email is already in use
    if (error.code === "P2002") {
      res.status(401).json({ error: error.meta.target });
    } else {
      res.status(500).json({ error: true });
    }
  }
};
