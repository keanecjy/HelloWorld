// Retrieve confidential information from .env file
const result = require("dotenv").config();

if (result.error) {
  throw result.error;
}

// import statements
const express = require("express");
const mongoose = require("mongoose");
const { queryParser } = require("express-query-parser");
const helmet = require("helmet");
const compression = require("compression");
const Message = require("./models/Message");
const User = require("./models/User");
const isEmpty = require("lodash/isEmpty");

// Initialize app to a server
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:64226"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const cors = require("cors");

var corsOptions = {
  // Specifies the origin(s) from which a server request can occur aside from its own origin
  origin: ["http://localhost:3000", "http://localhost:64226"],
};

app.use(cors(corsOptions));

// Increase security by configuring headers
app.use(helmet());
// Compresses the request from client
app.use(compression());

// Allows parsing of JSON from client
app.use(express.json());

// Allows parsing of x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Converts booleans in url parameter into actual booleans instead of treating them like string, similarly for null
app.use(
  queryParser({
    parseNull: true,
    parseBoolean: true,
  })
);

// Gets the URI of the MongoDB database used by app
const db = require("./config/keys").mongoURI; // Can change to mongoAtlasURI to connect to cloud database

// mongoDB settings
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  // autoIndex: true, // Will result in rejection of duplicate entries
  keepAlive: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
  useFindAndModify: false,
  useUnifiedTopology: true,
};

// Socket.io connections between client and server
io.on("connection", (socket) => {
  console.log("Successfully established a new connection");
  console.log(socket.id);

  Message.find({})
    .limit(100)
    .sort({ _id: 1 })
    .then((messages) => {
      console.log(messages);
      socket.emit("output", messages);
    })
    .catch((err) => console.log(err));

  const setStatus = (msg) => {
    socket.emit("status", msg);
  };

  socket.on("input", (data) => {
    if (isEmpty(data.username) || isEmpty(data.text)) {
      setStatus("Please enter name and text");
    } else {
      const newMessage = new Message({
        username: data.username,
        text: data.text,
      });

      newMessage.save().then((message) => {
        socket.emit("output", [message]);
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user has left");
    console.log(socket.id);
  });
});

// Connect to the specified MongoDB database
mongoose
  .connect(db, options)
  .then(() => {
    console.log("MongoDB successfully connected");
  })
  .catch((err) => console.log(err));

// Uses process.env.PORT if available otherwise 5000
const port = process.env.PORT || 5000;

// Tells the server which port to listen on
server.listen(port, () =>
  console.log(`Server up and running on port ${port}!`)
);
