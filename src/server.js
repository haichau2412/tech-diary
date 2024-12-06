import express from "express"
import { ApolloServer, gql } from "apollo-server-express"
import mongoose from "mongoose"

// Connect to MongoDB
mongoose.connect("mongodb+srv://chau96cc:bubtjH3YwlxKEAGG@cluster0.o9pfd.mongodb.net/");

const app = express();

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    createBook(title: String!, author: String!): Book
    updateBook(id: ID!, title: String, author: String): Book
    deleteBook(id: ID!): Boolean
  }
`;

const books = [
  { id: "1", title: "Book 1", author: "Author 1" },
  { id: "2", title: "Book 2", author: "Author 2" },
];

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, { id }) => books.find((book) => book.id === id),
  },
  Mutation: {
    createBook: (parent, { title, author }) => {
      const newBook = { id: String(books.length + 1), title, author };
      books.push(newBook);
      return newBook;
    },
    updateBook: (parent, { id, title, author }) => {
      const book = books.find((book) => book.id === id);
      if (!book) {
        throw new Error("Book not found");
      }
      book.title = title || book.title;
      book.author = author || book.author;
      return book;
    },
    deleteBook: (parent, { id }) => {
      const bookIndex = books.findIndex((book) => book.id === id);
      if (bookIndex === -1) {
        throw new Error("Book not found");
      }
      books.splice(bookIndex, 1);
      return true;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

await server.start()

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`),
);
