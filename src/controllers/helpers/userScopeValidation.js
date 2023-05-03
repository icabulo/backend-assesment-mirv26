import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Check USER:
// This helper function:
// Checks if the userID from the body request equals the ID from the Token authorization
export function isAuthorized(inputId, targetId) {
  return inputId.toString() === targetId.toString();
}

// CHECK LISTS FOR USER
// This helper function:
// gets an array for all the lists a user has, then compares the idList from the body request

export const listValidation = async (userId, listIdInput) => {
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
  //get an array with the id's of the lists the user has
  const userList = queryUserList.lists.map((item) => item.idlist);

  return userList.includes(parseInt(listIdInput));
};
