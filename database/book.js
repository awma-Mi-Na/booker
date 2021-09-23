// note the import syntax is an ES6 syntax
import { Schema, Model } from "mongoose";

// create schema of book
const BookSchema = Schema({
  isbn: String,
  title: String,
  pubDate: String,
  lang: String,
  numPage: Number,
  author: [Number],
  category: [String],
  publication: Number,
});

// create model
const BookModel = Model(BookSchema);

export default BookModel;

// we are making seperate file for each schema because its cleaner and easier to maintain
