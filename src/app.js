require("dotenv").config();
require("./config/db")
const express = require("express");
const userRoute = require("./routes/user.route")

const port = process.env.PORT || 3000

const app = express();

app.use(express.json());
app.use(userRoute)

app.get("/", (req, res) => {
  res.status(200).send("Project successfully deployed");
});

app.get("*", (req, res) => {
  res.status(500).send("Route not found!");
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
