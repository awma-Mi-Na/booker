// requirements for the project

// we are a book management company

// books -> ISBN, title, pub date, language, no. pages, author[], category[]

// authors -> id, name, books[]

// publications -> id, name, books[]

/*
required APIs:

for books:
1. to get all books
2. to get specific books
3. to get list of books based on category
4. to get list of books based on languages

for authors:
1. to get all authors
2. to get specific authors
3. to get list of authors based on books

for publications:
1. to get all publications
2. to get specific publications
3. to get list of publications based on books
 */

/*
New API features:
in book
    for POST:
    1. add new book

    for PUT:
    1. update book title
    2. update/add author (this will mandate addition of that book in author)

    for DELETE:
    1. delete a book
    2. delete an author

in author:
    for POST:
    1. add new author

    for PUT:
    1. update author name

    for DELETE:
    1. delete an author

in publications
    for POST:
    1. add new publications

    for PUT:
    1. update publication name
    2/ update/add books to publications

    for DELETE:
    1. delete the publications
    2. delete a book from publications
*/

// from teacher pavankpdev
// Requirements

// We are a company that handles book publications

// Book
// ISBN, Title, Author [], Language, Pub Date, Num Page, Category[]

// Authors
// Name, Id, Books[]

// Publications
// Name, Id, Books[]

// Requirements

// ---------------------------------------------------------------------------------------

// Books

// We need an API

// GET
// to get all books โ ๐
// to get specific book โ ๐
// to get a list of books based on categoryโ ๐
// to get a list of books based on author -> [Task]๐ฅ ๐

// POST
// New Book โ ๐

// PUT
// Update book detailsโ ๐
// update/add new authorโ ๐

// DELETE
// delete a bookโ ๐
// delete a author from a bookโ ๐

// ---------------------------------------------------------------------------------------

// Author

// We need an API

// GET
// to get all authorsโ ๐
// to get specific author [Task]๐ฅ  ๐
// to get a list of authors based on a book. โ  ๐

// POST
// New Author โ ๐

// PUT
// update Author name using id [Task] ๐ฅ

// DELETE
// Delete an author [Task] ๐ฅ๐

// ---------------------------------------------------------------------------------------

// Publication

// We need an API

// GET
// to get all publications โ  ๐
// to get specific publication [Task]๐ฅ  ๐
// to get a list of publications based on a book. [Task]๐ฅ  ๐

// POST
// Add new publication [task] ๐ฅ  ๐

// PUT
// update publication name using id [Task] ๐ฅ
// update/add new book to a publicationโ

// DELETE
// delete a book from publication โ
// delete a publication [Task] ๐ฅ๐

// Add mongoose validation to All the models [Task] ๐ฅ
