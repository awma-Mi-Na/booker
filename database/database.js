let books = [
  {
    isbn: "book1",
    title: "what is the longest way?",
    pubDate: "14-02-2021",
    lang: "en",
    numPage: 450,
    author: [1],
    category: ["life", "philosophy", "non-fiction"],
    publication: 1,
  },
  {
    isbn: "book2",
    title: "there are no people there",
    pubDate: "01-02-2013",
    lang: "en",
    numPage: 410,
    author: [1, 2],
    category: ["chemistry", "physics", "non-fiction"],
    publication: 2,
  },
  {
    isbn: "book3",
    title: "this is tiger",
    pubDate: "01-12-2015",
    lang: "mz",
    numPage: 110,
    author: [3],
    category: ["educational", "biology", "non-fiction"],
    publication: 1,
  },
  {
    isbn: "book4",
    title: "my life",
    pubDate: "21-11-2020",
    lang: "en",
    numPage: 710,
    author: [2],
    category: ["auto-biography", "non-fiction"],
    publication: 2,
  },
];

const authors = [
  {
    id: 1,
    name: "biaka",
    books: ["book1", "book2"],
  },
  {
    id: 2,
    name: "mawia",
    books: ["book2", "book4"],
  },
  {
    id: 3,
    name: "justin",
    books: ["book3"],
  },
];

const publications = [
  {
    id: 1,
    name: "pearson",
    books: ["book1", "book3"],
  },
  {
    id: 2,
    name: "clerkson",
    books: ["book2", "book4"],
  },
];

module.exports = { books, authors, publications };
