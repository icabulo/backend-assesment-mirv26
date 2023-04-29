import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createItem = async (req, res) => {
  try {
    const newItem = await prisma.items.create({
      data: req.body,
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};
