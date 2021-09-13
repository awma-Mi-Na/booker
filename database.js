let books = [
  {
    isbn: "1111",
    title: "what is the longest way?",
    pubDate: "14-02-2021",
    lang: "en",
    numPage: 450,
    author: [1],
    category: ["life", "philosophy", "non-fiction"],
  },
  {
    isbn: "1112",
    title: "there are no people there",
    pubDate: "01-02-2013",
    lang: "en",
    numPage: 410,
    author: [1, 2],
    category: ["chemistry", "physics", "non-fiction"],
  },
];

const authors = [
  {
    id: 1,
    name: "biaka",
    books: ["1111", "1112"],
  },
  {
    id: 2,
    name: "mawia",
    books: ["1112"],
  },
];

const publications = [
  {
    id: 1,
    name: "pearson",
    books: ["1111"],
  },
  {
    id: 2,
    name: "clerkson",
    books: ["1112"],
  },
];

module.exports = { books, authors, publications };
