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

export default resolvers