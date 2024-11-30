const UserRatingsService = require('../service/userRatings.service')

//Add ratings
async function addRatingsAndReviews(req, res) {
    try{
        const rating = req.body;

        const result = await UserRatingsService.addRatingsAndReviews(rating);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        }
    } catch (error){
        console.error("Error adding rating and review controller: ", error);
        return res.status(500).json({
            error: true,
            payload: "Internal Server Error"
        });
    }
}

//Get All user ratings for a book
async function getRatingsByBookId(req, res) {
    try {
        const {id}  = req.params;
        const result = await UserRatingsService.getRatingsByBookId(id);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json ({
            error: true,
            payload: error
        })
    }
}


//Calculate average rating for a book
async function getAverageRating(req, res) {
    try{
        const { bookId } = req.params;

        const result = await UserRatingsService.getAverageRating(bookId);
        console.log(result.payload)

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        }

    } catch (error){
        console.error("Error getting average user rating controller: ", error);
        return res.status(500).json({
            error: true,
            payload: "Internal Server Error"
        });

    }
}

// Get a user rating for a specific book by user ID and book ID
async function getUserRatingForBook(req, res) {
    try {
        // Extract bookId and userId from request parameters
        const { bookId, userId } = req.params;

        // Call the service to get the user rating for the specific book
        const result = await UserRatingsService.getUserRatingForBook(bookId, userId);

        // Check if there is an error or if no rating is found
        if (result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload,
            });
        }

        // Return the rating data if found
        return res.status(result.status).json({
            error: false,
            payload: result.payload,
        });

    } catch (error) {
        // Log the error and return a 500 status code for server errors
        console.error('Error in getUserRatingForBook Controller:', error);
        return res.status(500).json({
            error: true,
            payload: "Server Error",
        });
    }
}


// Update a user rating for a specific book by user ID and book ID
async function editUserRatingForBook(req, res) {
    try {
        const { bookId, userId } = req.params; // Extract bookId and userId from request parameters
        const updatedRating = req.body; // Get the new rating data from the request body

        // Call the service to update the user rating
        const result = await UserRatingsService.editUserRatingForBook(bookId, userId, updatedRating);

        // Check if there's an error
        if (result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload,
            });
        }

        // Return success response
        return res.status(result.status).json({
            error: false,
            payload: result.payload,
        });

    } catch (error) {
        // Log the error and return a 500 status code for server errors
        console.error('Error in editUserRatingForBook Controller:', error);
        return res.status(500).json({
            error: true,
            payload: "Server Error",
        });
    }
}

// Delete a user rating for a specific book by user ID and book ID
async function deleteUserRatingForBook(req, res) {
    try {
        const { bookId, userId } = req.params; // Extract bookId and userId from request parameters

        // Call the service to delete the user rating
        const result = await UserRatingsService.deleteUserRatingForBook(bookId, userId);

        // Check if there's an error
        if (result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload,
            });
        }

        // Return success response
        return res.status(result.status).json({
            error: false,
            payload: result.payload,
        });

    } catch (error) {
        // Log the error and return a 500 status code for server errors
        console.error('Error in deleteUserRatingForBook Controller:', error);
        return res.status(500).json({
            error: true,
            payload: "Server Error",
        });
    }
}

module.exports = {
    addRatingsAndReviews,
    getRatingsByBookId,
    getAverageRating,
    getUserRatingForBook,
    editUserRatingForBook,
    deleteUserRatingForBook 
}

