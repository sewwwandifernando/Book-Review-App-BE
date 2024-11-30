const bcrypt = require("bcrypt");
const userService = require("../service/users.service");
const { Users } = require("../models"); 
const { sign } = require("jsonwebtoken");

//Register User 
async function registerUser(req, res) {
    try {
        
        const {name,email, username, password,roleId} = req.body;

        const hashPassword = await bcrypt.hash(password, 10);
        const result = await userService.createUser(name,email,username, hashPassword,roleId);
        
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
        return res.status(500).json({
            error: true,
            payload: error
        })
    
    }
}

//Login User
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        const user = await userService.loginUser(username);
        console.log(user);

        if (!user) {
            return res.json({ 
                error: true,
                payload: "User Doesn't Exist"
             });
            
          }
        else {
            bcrypt.compare(password, user.password).then(async (match) => {
                if (!match) {res.status(400).json({ 
                    error: true,
                    payload: "Wrong Username And Password Combination" 
                });
            }
                else{
                  const accessToken = sign(
                    { username: user.username, id: user.id, role: user.roles.role, roleId: user.roleId },
                    "importantsecret"
                  );
                  res.status(200).json({
                    error: false,
                    payload: accessToken
                  });
                }  
              });
        }     
    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get User By ID
async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const result = await userService.getUserById(id);

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
        return res.status(500).json ({
            error: true,
            payload: error
        })
    }
}

// Get All Users
async function getAllUsers(req, res) {
    try {
        const result = await userService.getAllUsers();

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
        return res.status(500).json({
            error: true,
            payload: error.message
        });
    }
}

// Update User
async function updateUser(req, res) {
    try {
        const id = req.params.id;
        const userData = req.body;  // Get the updated user data from the request body

        // If a password is provided, hash it
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }

        const result = await userService.updateUser(id, userData);

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
        return res.status(500).json({
            error: true,
            payload: error.message
        });
    }
}

// Delete User
async function deleteUser(req, res) {
    try {
        const id = req.params.id;

        // Find user by ID
        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(404).json({
                error: true,
                payload: "User not found."
            });
        }

        // Delete the user
        await user.destroy();

        return res.status(200).json({
            error: false,
            payload: "User successfully deleted."
        });

    } catch (error) {
        console.error('Error Deleting User: ', error);
        return res.status(500).json({
            error: true,
            payload: error.message
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser 
}


