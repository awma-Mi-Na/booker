// initialize express router for microservice
const Router = require("express").Router();

// importing the database model for book
const BookModel = require("../../database/book");
const AuthorModel = require("../../database/author");

// following are the api's

/*
route               /book
description         get all books
access              public
parameter           none
methods             get
*/

Router.get("/", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json({ book: getAllBooks });
});

/*
route               /book
description         get specific book based on isbn code
access              public
parameter           isbn
methods             get
*/
Router.get("/:isbn", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({ isbn: req.params.isbn });
  // const getSpecificBook = database.books.filter(
  //   (book) => book.isbn === req.params.isbn
  // );

  if (!getSpecificBook) {
    // the mongoose model will return a null if no entry is found
    return res.json({ error: `no book found for ISBN of ${req.params.isbn}` });
  }

  return res.json({ book: getSpecificBook });
});

/*
route               /book/cat
description         get specific book based on category
access              public
parameter           category
methods             get
*/

Router.get("/cat/:category", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({
    category: req.params.category,
  });
  // const getSpecificBook = database.books.filter((book) =>
  //   book.category.includes(req.params.category)
  // );
  if (!getSpecificBook) {
    return res.json({
      error: `no book found for category of ${req.params.category}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
route               /book/lang
description         get specific book based on language
access              public
parameter           lang
methods             get
*/

Router.get("/lang/:lang", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({
    lang: req.params.lang,
  });
  // const getSpecificBook = database.books.filter(
  //   (book) => book.lang === req.params.lang
  // );
  if (!getSpecificBook) {
    return res.json({
      error: `no book found for language of ${req.params.lang}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
route               /book/add
description         add new book
access              public
parameter           book
methods             post
*/
Router.post("/add", async (req, res) => {
  const { newBook } = req.body;
  BookModel.create(newBook); // await is not needed here because create does not return any value

  // database.books.push(newBook);
  return res.json({ books: addNewBook, message: "book added successfully" });
});

/*
route               /book/update/title
description         update book title
access              public
parameter           isbn
methods             put
*/
Router.put("/update/title/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    { isbn: req.params.isbn },
    { title: req.body.newBookTitle },
    { new: true }
  );
  // database.books.forEach((book) => {
  //   if (book.isbn === req.params.isbn) {
  //     book.title = req.body.newBookTitle;
  //     return;
  //   }
  // });
  return res.json({ books: updatedBook });
});

/*
route               /book/update/author
description         update/add author
access              public
parameter           isbn
methods             put
*/
Router.put("/update/author/:isbn/:authorID", async (req, res) => {
  // update book database

  const updatedBook = await BookModel.findOneAndUpdate(
    { isbn: req.params.isbn },
    {
      $addToSet: {
        author: req.params.authorID,
      },
    },
    { new: true }
  );

  // database.books.forEach((book) => {
  //   if (book.isbn === req.params.isbn) {
  //     return book.author.push(parseInt(req.params.authorID));
  //   }
  // });

  // update author database

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    { id: req.params.authorID },
    {
      $addToSet: {
        books: req.params.isbn,
      },
    },
    { new: true }
  );

  // database.authors.forEach((author) => {
  //   if (author.id === parseInt(req.params.authorID)) {
  //     return author.books.push(req.params.isbn);
  //   }
  // });

  return res.json({ books: updatedBook, author: updatedAuthor });
});

/*
route               /book/delete
description         delete a book
access              public
parameter           isbn
methods             delete
*/

Router.delete("/delete/:isbn", async (req, res) => {
  const deleteBook = await BookModel.findOneAndDelete({
    isbn: req.params.isbn,
  });
  // const updatedBookDb = database.books.filter(
  //   (book) => book.isbn !== req.params.isbn
  // );

  // database.books = updatedBookDb;
  return res.json({ deletedBook: deleteBook });
});

/*
route               /book/delete/author
description         delete an author from a book
access              public
parameter           isbn, author id
methods             delete
*/

Router.delete("/delete/author/:isbn/:authorID", async (req, res) => {
  //update the book database

  const updatedBook = await BookModel.findOneAndUpdate(
    { isbn: req.params.isbn },
    {
      $pull: {
        author: parseInt(req.params.authorID),
      },
    },
    { new: true }
  );

  // database.books.forEach((book) => {
  //   if (book.isbn === req.params.isbn) {
  //     const newAuthorList = book.author.filter(
  //       (author) => author !== parseInt(req.params.authorID)
  //     );
  //     book.author = newAuthorList;
  //     return;
  //   }
  // });

  // update the author database

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    { id: parseInt(req.params.authorID) },
    {
      $pull: {
        books: req.params.isbn,
      },
    },
    { new: true }
  );

  // database.authors.forEach((author) => {
  //   if (author.id === parseInt(req.params.authorID)) {
  //     const newBookList = author.books.filter(
  //       (book) => book !== req.params.isbn
  //     );
  //     author.books = newBookList;
  //     return;
  //   }
  // });
  return res.json({
    message: "author was deleted 😍",
    books: updatedBook,
    authors: updatedAuthor,
  });
});

module.exports = Router;
