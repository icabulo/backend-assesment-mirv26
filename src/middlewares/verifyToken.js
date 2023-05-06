import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // "Bearer token" format
  const token = req.header("Authorization").split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.SECRET);
    const { exp: expDate, id } = decode;
    // injecting user id into the request body
    req.body.tokenUserId = id;

    //check if expired
    if (Date.now() / 1000 > expDate) {
      res.status(401).send("Token expired");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true });
  }
};
