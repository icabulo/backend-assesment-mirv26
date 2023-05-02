import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function listValidation(userId, listIdInput) {
  console.log(userId);
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
  console.log(queryUserList);
  //get an array with the id's of the lists the user has
  const userList = queryUserList.lists.map((item) => item.idlist);

  return userList.includes(parseInt(listIdInput));
}

export const createItem = async (req, res) => {
  const { idList } = req.params;
  const { tokenUserId } = req.body;

  const result = await listValidation(tokenUserId, idList);

  if (!result) {
    return res.status(202).json({
      errorMessage: "Non valid user list creation: lists_idlist Unauthorized",
    });
  }

  //copy body object, and override lists_idlist to match req.param
  const validData = { ...req.body, lists_idlist: parseInt(idList) };
  // remove previously injected tokenUserId.
  delete validData.tokenUserId;

  // console.log("NEW DATA", validData);

  // res.send("item created");

  try {
    const newItem = await prisma.items.create({
      data: validData,
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};
