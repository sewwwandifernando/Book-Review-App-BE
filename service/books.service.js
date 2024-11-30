const { Books } = require('../models')

//Add new book 
async function addBook(book) {
    try {
        const result = await Books.create(book);
        return {
            status: 201,
            error: false,
            payload: result
        }
    } catch (error) {
        console.error('Error Adding Book Service : ',error);
        throw error;
    }
    
}

//Get All Books
async function getAllBooks() {
    try{
        const result = await Books.findAll();
        return {
            status: 200,
            error: false,
            payload: result
        }
    } catch (error) {
        console.error('Error getting all books Service: ', error);
        throw error;
    }
}


// Get Book By ID
async function getBookById(bookId) {
    try {
        const result = await Books.findByPk(bookId);  // Fetch the book by primary key (ID)

        if (!result) {
            return {
                status: 404,
                error: true,
                payload: "Book not found"
            };
        }

        return {
            status: 200,
            error: false,
            payload: result
        };
    } catch (error) {
        console.error('Error getting book by ID Service: ', error);
        throw error;
    }
}


//Update book details.
async function updateBook(id, updatedData) {
    try {
        const book = await Books.findByPk(id);

        if(!book) {
            return { 
                error: true,
                status: 404,
                payload: "Book not found."
            };
        }
        await book.update(updatedData);


    return {
        error: false,
        status: 200,
        payload: "Book updated successfully. "
    };

    } catch (error) {
        console.log(error)
        throw error;
    }

}

// Delete Book By ID
async function deleteBookById(bookId) {
    try {
        const book = await Books.findByPk(bookId);  // Fetch the book by primary key (ID)

        if (!book) {
            return {
                status: 404,
                error: true,
                payload: "Book not found"
            };
        }

        await book.destroy();  // Delete the book if it exists

        return {
            status: 200,
            error: false,
            payload: "Book deleted successfully"
        };
    } catch (error) {
        console.error('Error deleting book by ID Service: ', error);
        throw error;
    }
}


module.exports = {
    addBook,
    getAllBooks,
    updateBook,
    getBookById,
    deleteBookById
}