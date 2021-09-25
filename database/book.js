const mongoose = require("mongoose");

// create schema of book
const BookSchema = mongoose.Schema({
  isbn: {
    type: String,
    required: true,
    minLength: 5,
  },
  title: String,
  pubDate: String,
  lang: String,
  numPage: Number,
  author: [Number],
  category: [String],
  publication: Number,
});

// create model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;

// we are making seperate file for each schema because its cleaner and easier to maintain
