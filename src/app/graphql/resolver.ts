const books = [
    { id: "1", title: "Book 1", author: "Author 1" },
    { id: "2", title: "Book 2", author: "Author 2" },
];

const resolvers = {
    Query: {
        books: () => books,
        book: (_ = {}, { id }: { id: string }) => books.find((book) => book.id === id),
    },
    Mutation: {
        createBook: (_ = {}, { title, author }: { title: string, author: string }) => {
            const newBook = { id: String(books.length + 1), title, author };
            books.push(newBook);
            return newBook;
        },
        updateBook: (_ = {}, { id, title, author }: { title: string, id: string, author: string }) => {
            const book = books.find((book) => book.id === id);
            if (!book) {
                throw new Error("Book not found");
            }
            book.title = title || book.title;
            book.author = author || book.author;
            return book;
        },
        deleteBook: (_ = {}, { id }: { id: string }) => {
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