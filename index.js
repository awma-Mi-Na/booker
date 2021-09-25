require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// defining microservice routes
const booker = express();
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

// configuration
booker.use(express.json());

// connection with mongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connection established with database! 😍😎"));

// import database
// const database = require("./database/database");

// creating models
// const BookModel = require("./database/book");
// const AuthorModel = require("./database/author");
// const PublicationModel = require("./database/publication");

// initializing microservices
booker.use("/book", Books);
booker.use("/author", Authors);
booker.use("/publication", Publications);

booker.listen(7777, () => console.log("Server is running...🚀🚀"));
