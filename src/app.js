import express from "express";
import { localOnly } from "../localVariables.js";

const app = express();
const PORT = process.env.PORT || localOnly.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to API FAVS</h1>");
});

app.listen(PORT, () => {
  console.log(`Server Initialized on PORT:${PORT}`);
});
