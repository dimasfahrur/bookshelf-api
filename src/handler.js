const { nanoid } = require('nanoid');
const books = require('./books.js');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        finished, 
        reading, 
        insertedAt, 
        updatedAt
    };
    books.push(newBook)
    const isSuccess = notes.filter((note) => note.id === id).lenght > 0;

    if ((name !== undefined) && (name !== null)) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon ini nama buku',
        });
        response.code(400);
        return response;
    }
    if (pageCount > readPage) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readpage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }  
    
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    };

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan'
    });
    response.code(500);
    return response;
};

module.exports = {
    addBookHandler,
};