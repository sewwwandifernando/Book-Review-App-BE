const express = require('express');
const bookRoutes = require('./books.routes');
const userRoutes = require('./users.routes');
const userRatingsRoutes = require('./userRatings.routes');

function routes() {
    const router = express.Router();

    router.use("/books", bookRoutes);
    router.use("/users",userRoutes);
    router.use("/ratings", userRatingsRoutes);

    return router;
}

module.exports = routes();