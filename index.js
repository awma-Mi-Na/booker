require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// initialization
const booker = express();

// configuration
booker.use(express.json());

// connection with mongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connection established with database! 😍😎"));

// import database
const database = require("./database/database");

// creating models
const BookModels = require("./database/book");
const AuthorModels = require("./database/author");
const PublicationModels = require("./database/publication");

/*
route               /isbn
description         get all books
access              public
parameter           none
methods             get
*/

booker.get("/isbn", (req, res) => {
  return res.json({ book: database.books });
});

/*
route               /isbn
description         get specific book based on isbn code
access              public
parameter           isbn
methods             get
*/
booker.get("/isbn/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.isbn === req.params.isbn
  );

  if (getSpecificBook.length === 0) {
    return res.json({ error: `no book found for ISBN of ${req.params.isbn}` });
  }

  return res.json({ book: getSpecificBook });
});

/*
route               /cat
description         get specific book based on category
access              public
parameter           category
methods             get
*/

booker.get("/cat/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );
  if (getSpecificBook.length === 0) {
    return res.json({
      error: `no book found for category of ${req.params.category}`,
    });
  }

  return res.json({ book: getSpecificBook });
});
/*
route               /lang
description         get specific book based on language
access              public
parameter           lang
methods             get
*/

booker.get("/lang/:lang", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.lang === req.params.lang
  );
  if (getSpecificBook.length === 0) {
    return res.json({
      error: `no book found for language of ${req.params.lang}`,
    });
  }

  return res.json({ book: getSpecificBook });
});
/*
route               /author
description         get all authors
access              public
parameter           none
methods             get
*/

booker.get("/author", (req, res) => {
  return res.json({ authors: database.authors });
});

/*
route               /author
description         get specific authors based on id
access              public
parameter           id
methods             get
*/

booker.get("/author/:id", (req, res) => {
  const getSpecificAuthor = database.authors.filter(
    (author) => author.id === parseInt(req.params.id)
  );

  if (getSpecificAuthor.length === 0)
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

booker.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthor = database.authors.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthor.length === 0)
    return res.json({
      error: `no author found for the book ${req.params.isbn}`,
    });
  return res.json({ author: getSpecificAuthor });
});
/*
route               /publications
description         get all publications
access              public
parameter           none
methods             get
*/

booker.get("/publication", (req, res) => {
  return res.json({ publications: database.publications });
});

/*
route               /publication
description         get specific publications based on id
access              public
parameter           id
methods             get
*/

booker.get("/publication/:id", (req, res) => {
  const getSpecificpublication = database.publications.filter(
    (publication) => publication.id === parseInt(req.params.id)
  );

  if (getSpecificpublication.length === 0)
    return res.json({
      error: `no publication found with id of ${req.params.id}`,
    });
  return res.json({ publication: getSpecificpublication });
});

/*
route               /publication/book
description         get all publications based on books
access              public
parameter           book
methods             get
*/

booker.get("/publication/book/:isbn", (req, res) => {
  const getSpecificpublication = database.publications.filter((publication) =>
    publication.books.includes(req.params.isbn)
  );

  if (getSpecificpublication.length === 0)
    return res.json({
      error: `no publication found for the book ${req.params.isbn}`,
    });
  return res.json({ publication: getSpecificpublication });
});

/*
route               /book/add
description         add new book
access              public
parameter           book
methods             post
*/
booker.post("/book/add", (req, res) => {
  const { newBook } = req.body;

  database.books.push(newBook);
  return res.json({ books: database.books });
});

/*
route               /author/add
description         add new author
access              public
parameter           author
methods             post
*/
booker.post("/author/add", (req, res) => {
  const { newAuthor } = req.body;

  database.authors.push(newAuthor);
  return res.json({ authors: database.authors });
});

/*
route               /book/update/title
description         update book title
access              public
parameter           isbn
methods             put
*/
booker.put("/book/update/title/:isbn", (req, res) => {
  database.books.forEach((book) => {
    if (book.isbn === req.params.isbn) {
      book.title = req.body.newBookTitle;
      return;
    }
  });
  return res.json({ books: database.books });
});

/*
route               /book/update/author
description         update/add author
access              public
parameter           isbn
methods             put
*/
booker.put("/book/update/author/:isbn/:authorID", (req, res) => {
  // update book database
  database.books.forEach((book) => {
    if (book.isbn === req.params.isbn) {
      return book.author.push(parseInt(req.params.authorID));
    }
  });
  // update author database
  database.authors.forEach((author) => {
    if (author.id === parseInt(req.params.authorID)) {
      return author.books.push(req.params.isbn);
    }
  });

  return res.json({ books: database.books, author: database.authors });
});

/*
route               /publication/update/book
description         update/add books to publications
access              public
parameter           isbn
methods             put
*/
booker.put("/publication/update/book/:isbn", (req, res) => {
  database.publications.forEach((publication) => {
    if (publication.id === req.body.pubID) {
      return publication.books.push(req.params.isbn);
    }
  });
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = req.body.pubID;
      return;
    }
  });
  return res.json({
    books: database.books,
    publication: database.publications,
    message: "successfully updated publication",
  });
});

/*
route               /book/delete
description         delete a book
access              public
parameter           isbn
methods             delete
*/

booker.delete("/book/delete/:isbn", (req, res) => {
  const updatedBookDb = database.books.filter(
    (book) => book.isbn !== req.params.isbn
  );

  database.books = updatedBookDb;
  return res.json({ books: database.books });
});

/*
route               /book/delete/author
description         delete an author from a book
access              public
parameter           isbn, author id
methods             delete
*/

booker.delete("/book/delete/author/:isbn/:authorID", (req, res) => {
  //update the book database
  database.books.forEach((book) => {
    if (book.isbn === req.params.isbn) {
      const newAuthorList = book.author.filter(
        (author) => author !== parseInt(req.params.authorID)
      );
      book.author = newAuthorList;
      return;
    }
  });
  // update the author database
  database.authors.forEach((author) => {
    if (author.id === parseInt(req.params.authorID)) {
      const newBookList = author.books.filter(
        (book) => book !== req.params.isbn
      );
      author.books = newBookList;
      return;
    }
  });
  return res.json({
    message: "author was deleted 😍",
    books: database.books,
    authors: database.authors,
  });
});

/*
route               /author/delete
description         delete an author 
access              public
parameter           author id
methods             delete
*/
booker.delete("/author/delete", (req, res) => {
  //delete author from authors
  deleteAuthor = req.body.authorID;
  for (i = 0; i < database.authors.length; i++) {
    if (database.authors[i].id === deleteAuthor)
      database.authors = database.authors.splice(i - 1, 1);
  }

  // update author list in books
  database.books.forEach((book) => {
    const newAuthorList = book.author.filter(
      (authorID) => authorID !== deleteAuthor
    );
    book.author = newAuthorList;
    return;
  });
  return res.json({ authors: database.authors, books: database.books });
});

/*
route               /publication/delete/book
description         delete a book from a publication
access              public
parameter           publication id,isbn
methods             delete
*/

booker.delete("/publication/delete/book", (req, res) => {
  // delete book isbn from publication of pubID
  deleteBook = req.body.isbn;
  pubID = req.body.pubID;
  database.publications.forEach((publication) => {
    if (publication.id === pubID) {
      const newBookList = publication.books.filter(
        (book) => book !== deleteBook
      );
      publication.books = newBookList;
      return;
    }
  });

  // update books to reflect changes, by changing the publication info to be -1(meaning no publications)

  database.books.forEach((book) => {
    if (book.isbn === deleteBook) {
      book.publication = -1;
    }
  });
  return res.json({
    publications: database.publications,
    books: database.books,
  });
});
booker.listen(7777, () => console.log("Server is running...🚀🚀"));
