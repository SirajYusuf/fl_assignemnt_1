require('dotenv');

const Helper = require("../helpers/helper");

const UserModel = require("../models/user.model");

class ApiMiddleware {

    async auth(req, res, next) {
        try {
            const token = req.header("authorization").split(' ')[1];
            const user = await UserModel.findByToken(token);
            if (!user) {
                throw new Error("unauthorized");
            }
            req.user = user;
            next();
        } catch (error) {
            console.log(error)
            return Helper.getAuthErrorMessage(res,error);
        }
    }

}

module.exports = new ApiMiddleware();