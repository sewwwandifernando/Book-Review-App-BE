const express = require('express')
const bookController = require('../controller/books.controller')
const authMiddleware = require("../middlware/auth.middleware");

function bookRoutes() {
    const router = express.Router()

    router.use(express.json());

    router.get("/", bookController.getAllBooks);
    router.get("/:id", bookController.getBookById);

    router.use(authMiddleware);
    
    router.post("/", bookController.addBook);
    router.put("/:id", bookController.updateBook);
    router.delete("/:id", bookController.deleteBookById);


    return router;
}

module.exports = bookRoutes();