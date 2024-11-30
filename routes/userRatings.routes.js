const express = require("express");
const userRatingsController = require("../controller/userRatings.controller");
const authMiddleware = require("../middlware/auth.middleware");

function userRatingsRoutes() {
    const router = express.Router();

    router.use(express.json());

    router.get("/:id", userRatingsController.getRatingsByBookId);
    router.get("/avgrating/:bookId", userRatingsController.getAverageRating);
    router.get("/:bookId/:userId", userRatingsController.getUserRatingForBook);

    router.use(authMiddleware);

    router.post("/", userRatingsController.addRatingsAndReviews);
   
    router.put("/:bookId/:userId", userRatingsController.editUserRatingForBook);
    router.delete("/:bookId/:userId", userRatingsController.deleteUserRatingForBook);

    

    return router;
}

module.exports = userRatingsRoutes();