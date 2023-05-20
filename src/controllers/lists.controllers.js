import { PrismaClient } from "@prisma/client";
import { isAuthorized, listValidation } from "./helpers/userScopeValidation.js";
const prisma = new PrismaClient();

export const getAllLists = async (req, res) => {
  // User id is injected in the body when the verifyToken middleware runs
  const { tokenUserId } = req.body;

  // This section runs the main controller.
  try {
    const userLists = await prisma.users.findUnique({
      where: {
        iduser: parseInt(tokenUserId),
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
    // if the length is zero the user has no listed favorites
    if (userLists.lists.length > 0) {
      res.status(200).json(userLists.lists);
    } else {
      res.status(209).json({ message: "Empty list of favorites" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const createList = async (req, res) => {
  try {
    // This section validates that the user in body request is the same as in the Token
    const { name, user_iduser, tokenUserId } = req.body;
    /* if (user_iduser && !isAuthorized(user_iduser, tokenUserId)) {
      return res.status(202).json("userId is unauthorized");
    } */

    // This section runs the main controller.
    const newList = await prisma.lists.create({
      data: { name, user_iduser: tokenUserId }, // body user_iduser is overwriten to always match Token ID
    });
    res.status(201).json(newList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

export const findListById = async (req, res) => {
  try {
    const { tokenUserId } = req.body;
    const { id } = req.params;

    // This section validates that the list id (from the body request) is also part of the user list of favorites
    const result = await listValidation(tokenUserId, id);

    if (!result) {
      return res.status(202).json({
        errorMessage: "Unauthorized idlist: User doesn't have this list",
      });
    }

    // This section runs the main controller.
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
    const { tokenUserId } = req.body;
    const { id } = req.params;

    // This section validates that the list id (from the body request) is also part of the user list of favorites
    const result = await listValidation(tokenUserId, id);

    if (!result) {
      return res.status(202).json({
        errorMessage: "Unauthorized delete: User doesn't have this list",
      });
    }

    // This section runs the main controller.
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
// UPDATE method was not part of the mission assessment
//this code is a suggested base line for future implementations
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
