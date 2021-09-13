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
