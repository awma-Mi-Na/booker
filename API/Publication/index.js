const Router = require("express").Router();

const BookModel = require("../../database/book");
const PublicationModel = require("../../database/publication");

/*
route               /publication
description         get all publications
access              public
parameter           none
methods             get
*/

Router.get("/", async (req, res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json({ publications: getAllPublications });
});

/*
  route               /publication
  description         get specific publications based on id
  access              public
  parameter           id
  methods             get
  */

Router.get("/:id", async (req, res) => {
  const getSpecificpublication = await PublicationModel.findOne({
    id: req.params.id,
  });
  // const getSpecificpublication = database.publications.filter(
  //   (publication) => publication.id === parseInt(req.params.id)
  // );

  if (!getSpecificpublication)
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

Router.get("/book/:isbn", async (req, res) => {
  const getSpecificpublication = await PublicationModel.find({
    books: req.params.isbn,
  });
  // const getSpecificpublication = database.publications.filter((publication) =>
  //   publication.books.includes(req.params.isbn)
  // );

  if (!getSpecificpublication)
    return res.json({
      error: `no publication found for the book ${req.params.isbn}`,
    });
  return res.json({ publication: getSpecificpublication });
});

/*
  route               /publication/add
  description         add new publication
  access              public
  parameter           newPub
  methods             post
  */
Router.post("/add", (req, res) => {
  const { newPub } = req.body;
  PublicationModel.create(newPub);

  return res.json({ message: "publication added!" });
});

/*
  route               /publication/update/book
  description         update/add books to publications
  access              public
  parameter           isbn, pubID
  methods             put
  */
Router.put("/update/book/:isbn", async (req, res) => {
  // update the publication collection (collection as in mongoDB)
  const updatedPub = await PublicationModel.findOneAndUpdate(
    { id: req.body.pubID },
    {
      $addToSet: {
        books: req.params.isbn,
      },
    },
    { new: true }
  );

  // update the books collection

  const updatedBook = await BookModel.findOneAndUpdate(
    { isbn: req.params.isbn },
    { publication: req.body.pubID },
    { new: true }
  );

  //   database.publications.forEach((publication) => {
  //     if (publication.id === req.body.pubID) {
  //       return publication.books.push(req.params.isbn);
  //     }
  //   });
  //   database.books.forEach((book) => {
  //     if (book.ISBN === req.params.isbn) {
  //       book.publication = req.body.pubID;
  //       return;
  //     }
  //   });
  return res.json({
    books: updatedBook,
    publication: updatedPub,
    message: "successfully updated publication",
  });
});

/*
  route               /publication/delete/book
  description         delete a book from a publication
  access              public
  parameter           publication id,isbn
  methods             delete
  */

Router.delete("/delete/book", async (req, res) => {
  // delete book isbn from publication of pubID

  const updatedPub = await PublicationModel.findOneAndUpdate(
    { id: req.body.pubID },
    {
      $pull: {
        books: req.body.isbn,
      },
    },
    { new: true }
  );

  //   deleteBook = req.body.isbn;
  //   pubID = req.body.pubID;
  //   database.publications.forEach((publication) => {
  //     if (publication.id === pubID) {
  //       const newBookList = publication.books.filter(
  //         (book) => book !== deleteBook
  //       );
  //       publication.books = newBookList;
  //       return;
  //     }
  //   });

  // update books to reflect changes, by changing the publication info to be -1(meaning no publications)

  const updatedBook = await BookModel.findOneAndUpdate(
    { isbn: req.body.isbn },
    { publication: -1 },
    { new: true }
  );

  //   database.books.forEach((book) => {
  //     if (book.isbn === deleteBook) {
  //       book.publication = -1;
  //     }
  //   });
  return res.json({
    publications: updatedPub,
    books: updatedBook,
  });
});

module.exports = Router;
