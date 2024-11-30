const { UserRatings, Books, Users } = require('../models')


async function addRatingsAndReviews (rating) {
    try {
        const existRating = await UserRatings.findOne({
            where: {
                userId: rating.userId,
                bookId: rating.bookId
            }
        })

        if(existRating){
            return{
                status: 400,
                error: true,
                payload: "User has already rated this book!"
            }
        }
        const result = await UserRatings.create(rating)
        return{
            status: 201,
            error: false,
            payload: result
        }

        } catch (error) {
            console.error('Error adding rating and review service:', error);
        throw error;
        }

    } 

    //Get ratings by book Id for a book
    async function getRatingsByBookId(bookId) {
        try {

         const book = await Books.findByPk(bookId);  // Fetch the book by primary key (ID)

        if (!book) {
            return {
                status: 400,
                error: true,
                payload: "Invalid Book ID"
            };
        }
         const result = await UserRatings.findAll({
                where: { 
                    bookId: bookId,
                },
                attributes: ['ratings','reviews','userId'],
                include: [{
                    model: Users,
                    attributes: ['name', 'username']

                }]
            });  
            //console.log(result);
    
            if (!result || result==[]) {
                return {
                    status: 204,
                    error: false,
                    payload: "No reviews and ratings"
                };
            }
    
            return {
                status: 200,
                error: false,
                payload: result
            };
        } catch (error) {
            console.error('Error getting ratings book by ID Service: ', error);
            throw error;
        }
    }


    //Calculate average rating of a book
    async function getAverageRating(bookId) {
        try{
            const ratings = await UserRatings.findAll ({
                where: {
                    bookId: bookId
                },
                attributes: ['ratings']
            });

            if(ratings.length ===0) {
                return {
                    status: 204,
                    error: true,
                    payload: "N/A"
                };
            }
            const totalRatings = ratings.reduce((sum,record) => sum + record.ratings,0);
            const numberOfRatings = ratings.length;

            const averageRating = totalRatings/ numberOfRatings;

            return {
                status: 200,
                error: false,
                payload: averageRating
            }

            
        }  catch (error){
             console.error('Error calculating average rating service: ', error);
             throw error;
        }
    }
        
    



// Get a user rating for a specific book by user ID and book ID
async function getUserRatingForBook(bookId, userId) {
    try {
        // Find the rating based on the bookId and userId
        const rating = await UserRatings.findOne({
            where: {
                bookId: bookId,
                userId: userId,
            },
        });

        // If no rating is found, return a 404 status
        if (!rating) {
            return {
                status: 404,
                error: true,
                payload: "Rating not found for the specified book and user",
            };
        }

        // Return the found rating
        return {
            status: 200,
            error: false,
            payload: rating,
        };

    } catch (error) {
        console.error('Error getting user rating for book by bookId and userId in Service: ', error);
        return {
            status: 500,
            error: true,
            payload: "Server error",
        };
    }
}

// Edit a user rating for a specific book by user ID and book ID
async function editUserRatingForBook(bookId, userId, updatedRating) {
    try {
        // Check if the rating exists
        const existingRating = await UserRatings.findOne({
            where: {
                bookId: bookId,
                userId: userId,
            },
        });

        if (!existingRating) {
            return {
                status: 404,
                error: true,
                payload: "Rating not found for the specified book and user",
            };
        }

        // Update the existing rating with new data
        const result = await existingRating.update({
            ratings: updatedRating.ratings || existingRating.ratings, // Update only if new data is provided
            reviews: updatedRating.reviews || existingRating.reviews, // Update only if new data is provided
        });

        // Return the updated rating
        return {
            status: 200,
            error: false,
            payload: result,
        };

    } catch (error) {
        console.error('Error editing user rating for book by bookId and userId in Service: ', error);
        return {
            status: 500,
            error: true,
            payload: "Server error",
        };
    }
}

// Delete a user rating for a specific book by user ID and book ID
async function deleteUserRatingForBook(bookId, userId) {
    try {
        // Find the rating based on the bookId and userId
        const existingRating = await UserRatings.findOne({
            where: {
                bookId: bookId,
                userId: userId,
            },
        });

        // If no rating is found, return a 404 status
        if (!existingRating) {
            return {
                status: 404,
                error: true,
                payload: "Rating not found for the specified book and user",
            };
        }

        // Delete the rating
        await existingRating.destroy();

        // Return success message
        return {
            status: 200,
            error: false,
            payload: "Rating deleted successfully",
        };

    } catch (error) {
        console.error('Error deleting user rating for book by bookId and userId in Service: ', error);
        return {
            status: 500,
            error: true,
            payload: "Server error",
        };

    }
}

module.exports = {
    addRatingsAndReviews,
    getRatingsByBookId,
    getUserRatingForBook,
    editUserRatingForBook,
    deleteUserRatingForBook,
    getAverageRating
}