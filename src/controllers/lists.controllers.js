import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// const prisma = new PrismaClient({ log: ["query"] });

//targetID is injected with token authorization middlewqre
function isAuthorized(inputId, targetId) {
  return inputId.toString() === targetId.toString();
}

export const getAllLists = async (req, res) => {
  // console.log(req.body);
  const { userId, tokenUserId } = req.body;
  if (!isAuthorized(userId, tokenUserId)) {
    return res.status(202).json("userId is unauthorized");
  }
  //   console.log("id Type", typeof userId);
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
    // If userList is null the user was not found = no content for the user
    if (userLists) {
      // if the length is zero the user has no listed favorites
      if (userLists.lists.length > 0) {
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
  const { user_iduser, tokenUserId } = req.body;
  if (!isAuthorized(user_iduser, tokenUserId)) {
    return res.status(202).json("userId is unauthorized");
  }
  try {
    //body request has tokenId injected.
    // Data for prisma.create needs to be reorganized
    const validData = {
      name: req.body.name,
      user_iduser: req.body.tokenUserId,
    };
    // console.log(validData);
    const newList = await prisma.lists.create({
      data: validData,
    });
    res.status(201).json(newList);
    // res.send("creating list");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};

export const findListById = async (req, res) => {
  const { id } = req.params;
  const { tokenUserId } = req.body;
  if (!isAuthorized(id, tokenUserId)) {
    return res.status(202).json("Invalid path: userId is unauthorized");
  }

  try {
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

async function listValidation(userId, listIdInput) {
  const queryUserList = await prisma.users.findUnique({
    where: {
      iduser: parseInt(userId),
    },
    select: {
      lists: {
        select: {
          idlist: true,
        },
      },
    },
  });
  // console.log(queryUserList);
  //get an array with the id's of the lists the user has
  const userList = queryUserList.lists.map((item) => item.idlist);

  return userList.includes(parseInt(listIdInput));
}

export const deleteListById = async (req, res) => {
  try {
    const { tokenUserId } = req.body;
    const { id } = req.params;

    const result = await listValidation(tokenUserId, id);

    if (!result) {
      return res.status(202).json({
        errorMessage: "Unauthorized delete: User doesn't have this list",
      });
    }
    // res.send("deleting your list");
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
