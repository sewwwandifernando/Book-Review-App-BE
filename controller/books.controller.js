const bookService = require('../service/books.service')

//Add new book
async function addBook(req, res) {
    try {
        const userRoleid = req.user.roleId;
        const book = req.body;

        if (![1].includes(userRoleid)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can add Books." });
        }


        const result = await bookService.addBook(book);

        if(result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload
            }); 
        } else {
            return res.status(result.status).json({
                error: false,
                payload: result.payload
            });
        }
    } catch (error) {
        console.log("Error Adding Book Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: "Internal Server Error"
        })
    }
}

//Get All Books'
async function getAllBooks(req, res) {
    try {

        const result = await bookService.getAllBooks();

        if(result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload
            }); 
        } else {
            return res.status(result.status).json({
                error: false,
                payload: result.payload
            });
        }
    } catch (error) {
        console.log("Error get All Books Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: "Internal Server Error"
        });
    }
}


// Get Book By ID
async function getBookById(req, res) {
    try {
        const bookId = req.params.id;  // Get book ID from the request parameters

        const result = await bookService.getBookById(bookId);  // Fetch book by ID using the service

        if(result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload
            });
        } else {
            return res.status(result.status).json({
                error: false,
                payload: result.payload
            });
        }
    } catch (error) {
        console.log("Error in getBookById Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: "Internal Server Error"
        });
    }
}


//Update Book details
async function updateBook(req, res) {
    try{
        const userRoleid = req.user.roleId;
        const { id } = req.params;
        const updatedData = req.body;

        if (![1].includes(userRoleid)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can update Books." });
        }

        
        const result = await bookService.updateBook(id, updatedData);

        if (result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
        })}
        
    } catch (error) {
        console.log("Error update Book Controller: ", error);
        return res.status(500).json ({
            error: true,
            payload: "Internal Server error"
        })
    }

}

// Delete Book By ID
async function deleteBookById(req, res) {
    try {
        const userRoleid = req.user.roleId;
        const bookId = req.params.id;  // Get book ID from the request parameters

        if (![1].includes(userRoleid)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can delete Books." });
        }


        const result = await bookService.deleteBookById(bookId);  // Delete the book by ID using the service

        if (result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload
            });
        } else {
            return res.status(result.status).json({
                error: false,
                payload: result.payload
            });
        }
    } catch (error) {
        console.log("Error in deleteBookById Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: "Internal Server Error"
        });
    }
}
 

module.exports = {
    addBook,
    getAllBooks,
    updateBook,
    getBookById,
    deleteBookById
}