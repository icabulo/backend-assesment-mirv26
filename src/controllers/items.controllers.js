import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { listValidation } from "./helpers/userScopeValidation.js";

export const createItem = async (req, res) => {
  try {
    const { idList } = req.params;
    const { tokenUserId } = req.body;

    // This section validates that the user is authorized to create an item on the list
    const result = await listValidation(tokenUserId, idList);

    if (!result) {
      return res.status(202).json({
        errorMessage: "Non valid user list creation: lists_idlist Unauthorized",
      });
    }

    // This section runs the main controller.

    //body reques is modified because userID is injected in the verifyToken middleware.
    //copy body object, and override lists_idlist to match req.param
    const validData = { ...req.body, lists_idlist: parseInt(idList) };
    //NOTE: lists_idlist: parseInt(idList) => ensures that even if the body idlist has a typo then the correct id is assigned acording to the path req.param
    // remove previously injected tokenUserId.
    delete validData.tokenUserId;

    const newItem = await prisma.items.create({
      data: validData,
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};
