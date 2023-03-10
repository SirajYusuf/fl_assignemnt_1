require("dotenv").config();
require("./config/db")
const express = require("express");
const app = express();
const morgan = require('morgan')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const userRoute = require("./routes/user.route")
const { transaction } = require('./middlewares/dbSession');

var OAuth = require('oauth').OAuth
var url = require('url')

const port = process.env.PORT || 8080


app.use(morgan('dev'));
app.use(transaction);
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Project successfully deployed");
});
app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.use(userRoute)

/**
 * Failed Routes
 */

app.get("*", (req, res) => {
  res.status(500).send("Route not found!");
});
process.on('uncaughtException', (err) => {
  console.log(err)
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
