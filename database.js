const books = [
  {
    isbn: "12345Book",
    title: "what is the longest way?",
    pubDate: "14-02-2021",
    lang: "en",
    numPage: 450,
    author: [1],
    category: ["life", "philosophy", "non-fiction"],
  },
];

const authors = [
  {
    id: 1,
    name: "biaka",
    books: ["12345Book"],
  },
];

const publications = [
  {
    id: 1,
    name: "pearson",
    books: ["12345Book"],
  },
  {
    id: 2,
    name: "clerkson",
    books: [],
  },
];

module.exports = { books, authors, publications };
