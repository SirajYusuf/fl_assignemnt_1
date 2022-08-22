/* Third Party Libraries */
const bcrypt = require("bcrypt");
/* Third Party Libraries */

/* Helpers */
const Helper = require("../helpers/helper");
/* Helpers */

/* Models */
const BlogModel = require("../models/blog.model");
const CommentModel = require("../models/comment.model");
const UserModel = require("../models/user.model");
/* Models */

class UserController {
  //user registration
  async registerUser(req, res) {
    try {
      const body = req.body;
      body.password = bcrypt.hashSync(body.password, 8);
      const data = await new UserModel(body).save();
      await data.generateToken();
      return Helper.successMessage(res, data);
    } catch (error) {
      console.log(error);
      return Helper.errorMessage(res, error.message);
    }
  }
  //user login
  async login(req, res) {
    try {
      let { email, password } = req.body;
      const user = await UserModel.findOne({
        email,
      });
      const match = bcrypt.compareSync(password, user.password);
      if (!match) {
        throw new Error("invalid_credentials");
      }
      try {
        await UserModel.findByToken(user.tokens[0].token);
      } catch (e) {
        if (e.message === "jwt expired") {
          await UserModel.refreshToken(user);
        }
      }
      return Helper.successMessage(res, user);
    } catch (error) {
      console.log(error);
      return Helper.errorMessage(res, error.message);
    }
  }
  //create a blog post (requires token)
  async createBlog(req, res) {
    const user = req.user;
    try {
      const body = req.body;
      body.user = user._id;
      body.userName = user.name;
      const data = await new BlogModel(body).save();
      return Helper.successMessage(res, data);
    } catch (error) {
      console.log(error);
      return Helper.errorMessage(res, error.message);
    }
  }
  //get all the user's post (requires token)
  async getUserPosts(req, res) {
    try {
      const data = await BlogModel.find({});
      return Helper.successMessage(res, data);
    } catch (error) {
      console.log(error);
      return Helper.errorMessage(res, error.message);
    }
  }
  //comment on any post (requires token)
  async postComment(req, res) {
    const user = req.user;
    try {
      const body = req.body;
      body.user = user._id;
      body.userName = user.name;
      const data = await new CommentModel(body).save();
      return Helper.successMessage(res, data);
    } catch (error) {
      console.log(error);
      return Helper.errorMessage(res, error.message);
    }
  }
  //get all comments of a post (requires token)
  async getPostComments(req, res) {
    try {
      const post = req.params.post
      if(!post){
        throw new Error('post id is required')
      }
      const data = await CommentModel.find({post});
      return Helper.successMessage(res, data);
    } catch (error) {
      console.log(error);
      return Helper.errorMessage(res, error.message);
    }
  }
}

module.exports = new UserController();
