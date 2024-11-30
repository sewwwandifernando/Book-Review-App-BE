const express = require("express");
const userController = require("../controller/users.controller");

function UserRoutes() {
    const router = express.Router();

    router.use(express.json());

    router.post("/", userController.registerUser);
    router.post("/sign-in", userController.loginUser);
    router.get("/:id", userController.getUserById);
    router.get("/", userController.getAllUsers);
    router.put("/:id", userController.updateUser);
    router.delete("/:id", userController.deleteUser);

    return router;
}

module.exports = UserRoutes();