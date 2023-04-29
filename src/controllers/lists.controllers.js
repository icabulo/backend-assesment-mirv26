import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// const prisma = new PrismaClient({ log: ["query"] });

export const getAllLists = async (req, res) => {
  const { userId } = req.body;
  //   console.log("id Type", typeof userId);
  try {
    const userLists = await prisma.users.findUnique({
      where: {
        iduser: userId,
      },
      select: {
        lists: {
          select: {
            name: true,
            idlist: true,
            items: {
              select: {
                title: true,
                description: true,
                link: true,
              },
            },
          },
        },
      },
    });
    // console.log(userLists);
    // If userList is null the user was not found = no content for the user
    if (userLists) {
      // if the length is zero the user has no listed favorites
      if (userLists.lists.length > 1) {
        res.status(200).json(userLists.lists);
      } else {
        res.status(209).json({ message: "Empty list of favorites" });
      }
    } else {
      res.status(209).json({ error: true, errorMessage: "No content" });
    }
    // res.send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

export const createList = async (req, res) => {
  try {
    const newList = await prisma.lists.create({
      data: req.body,
    });
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const findListById = async (req, res) => {
  try {
    const { id } = req.params;
    const listById = await prisma.lists.findUnique({
      where: {
        idlist: parseInt(id),
      },
    });
    if (listById === null) {
      res
        .status(209)
        .json({ error: true, erroMessage: "No content: List id not found" });
    } else {
      res.status(200).json(listById);
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const deleteListById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteList = await prisma.lists.delete({
      where: {
        idlist: parseInt(id),
      },
    });
    res.json(deleteList);
  } catch (error) {
    if (error.code && error.code === "P2025") {
      res.status(209).json(error);
    } else {
      res.status(500).json({ error: true });
    }
  }
};

/* 
// UPDATE method was not part of the mission assesment
export const updateListById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateList = await prisma.lists.update({
      where: {
        idlist: parseInt(id),
      },
      data: req.body,
    });
    res.status(200).json(updateList);
  } catch (error) {
    if (error.code && error.code === "P2025") {
      res.status(209).json(error);
    } else {
      res.status(500).json({ error: true });
    }
  }
}; */
