import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
// import { localOnly } from "../localVariables.js";
import listsRoutes from "./routes/lists.routes.js";
import usersRoutes from "./routes/users.routes.js";
import itemsRoutes from "./routes/items.routes.js";

const app = express();
// const PORT = process.env.PORT || localOnly.PORT;
const PORT = process.env.PORT;
// console.log(PORT);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to API FAVS</h1>");
});

app.use("/api/favs", listsRoutes);
app.use("/user", usersRoutes);
app.use("/item", itemsRoutes);

app.listen(PORT, () => {
  console.log(`Server Initialized on PORT:${PORT}`);
});
