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
// to get all books ✅ 📌
// to get specific book ✅ 📌
// to get a list of books based on category✅ 📌
// to get a list of books based on author -> [Task]🔥 📕

// POST
// New Book ✅ 📌

// PUT
// Update book details✅ 📌
// update/add new author✅ 📌

// DELETE
// delete a book✅ 📌
// delete a author from a book✅ 📌

// ---------------------------------------------------------------------------------------

// Author

// We need an API

// GET
// to get all authors✅ 📌
// to get specific author [Task]🔥  📕
// to get a list of authors based on a book. ✅  📕

// POST
// New Author ✅ 📌

// PUT
// update Author name using id [Task] 🔥

// DELETE
// Delete an author [Task] 🔥🚀

// ---------------------------------------------------------------------------------------

// Publication

// We need an API

// GET
// to get all publications ✅  📕
// to get specific publication [Task]🔥  📕
// to get a list of publications based on a book. [Task]🔥  📕

// POST
// Add new publication [task] 🔥  📕

// PUT
// update publication name using id [Task] 🔥
// update/add new book to a publication✅

// DELETE
// delete a book from publication ✅
// delete a publication [Task] 🔥🚀

// Add mongoose validation to All the models [Task] 🔥
