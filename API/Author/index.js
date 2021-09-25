const Router = require("express").Router();

const AuthorModel = require("../../database/author");
const BookModel = require("../../database/book");

/*
route               /author
description         get all authors
access              public
parameter           none
methods             get
*/

Router.get("/", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json({ authors: getAllAuthors });
});

/*
  route               /author
  description         get specific authors based on id
  access              public
  parameter           id
  methods             get
  */

Router.get("/:id", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.findOne({ id: req.params.id });
  // const getSpecificAuthor = database.authors.filter(
  //   (author) => author.id === parseInt(req.params.id)
  // );

  if (!getSpecificAuthor)
    return res.json({ error: `no author found with id of ${req.params.id}` });
  return res.json({ author: getSpecificAuthor });
});

/*
  route               /author/book
  description         get all authors based on books
  access              public
  parameter           book
  methods             get
  */

Router.get("/book/:isbn", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.find({ books: req.params.isbn });
  // const getSpecificAuthor = database.authors.filter((author) =>
  //   author.books.includes(req.params.isbn)
  // );

  if (!getSpecificAuthor)
    return res.json({
      error: `no author found for the book ${req.params.isbn}`,
    });
  return res.json({ author: getSpecificAuthor });
});

/*
route               /author/add
description         add new author
access              public
parameter           author
methods             post
*/
Router.post("/add", (req, res) => {
  const { newAuthor } = req.body;
  AuthorModel.create(newAuthor);

  // database.authors.push(newAuthor);
  return res.json({ message: "author added!" });
});

/*
route               /author/delete
description         delete an author 
access              public
parameter           author id
methods             delete
*/
Router.delete("/delete", async (req, res) => {
  //delete author from authors

  const deletedAuthor = await AuthorModel.findOneAndDelete({
    id: req.body.authorID,
  });
  //   deleteAuthor = req.body.authorID;
  //   for (i = 0; i < database.authors.length; i++) {
  //     if (database.authors[i].id === deleteAuthor)
  //       database.authors = database.authors.splice(i - 1, 1);
  //   }

  // update author list in books

  const updatedBook = await BookModel.updateMany(
    { author: req.body.authorID },
    {
      $pull: {
        author: req.body.authorID,
      },
    },
    { new: true }
  );

  //   database.books.forEach((book) => {
  //     const newAuthorList = book.author.filter(
  //       (authorID) => authorID !== deleteAuthor
  //     );
  //     book.author = newAuthorList;
  //     return;
  //   });
  return res.json({ authorDeleted: deletedAuthor, booksUpdated: updatedBook });
});

module.exports = Router;
