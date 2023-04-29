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

export const findCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const commentById = await prisma.comments.findFirst({
      where: {
        idcomment: parseInt(id),
      },
    });
    if (commentById === null) {
      res
        .status(209)
        .json({ error: true, erroMessage: "No content: Comment id not found" });
    } else {
      res.status(200).json(commentById);
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const updateCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateComment = await prisma.comments.update({
      where: {
        idcomment: parseInt(id),
      },
      data: req.body,
    });
    res.status(200).json(updateComment);
  } catch (error) {
    if (error.code && error.code === "P2025") {
      res.status(209).json(error);
    } else {
      res.status(500).json({ error: true });
    }
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteComment = await prisma.comments.delete({
      where: {
        idcomment: parseInt(id),
      },
    });
    res.json(deleteComment);
  } catch (error) {
    if (error.code && error.code === "P2025") {
      res.status(209).json(error);
    } else {
      res.status(500).json({ error: true });
    }
  }
};
