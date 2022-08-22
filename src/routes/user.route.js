const express = require("express");
const Route = express.Router();

/* Controllers */
const UserController = require("../controllers/user.controller");
/* Controllers */

/* Authentication */
const authMiddle = require("../middlewares/auth")
/* Authentication */

/*Authorization Routes*/
Route.post("/user/registration", UserController.registerUser);
Route.post("/user/login", UserController.login);
/*End Authorization Routes*/
Route.use(authMiddle.auth)

/*Post Routes*/
Route.post("/user/createBlog", UserController.createBlog);
Route.get("/user/posts", UserController.getUserPosts)
Route.post("/user/post/comment", UserController.postComment);
Route.get("/user/posts/get-comments/:post", UserController.getPostComments)
/*End Post Routes*/

module.exports = Route;
