import express from "express";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello API Prisma</h1>");
});

app.listen(PORT, () => {
  console.log("Server Initialized port 5000");
});
