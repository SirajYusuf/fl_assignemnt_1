require('dotenv')
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30);

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    phone: {
      type: Number,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const secret = process.env.JWT_SECRET;

/* generates token */
User.methods.generateToken = function (session) {
    let user = this;
    const token = jwt.sign({
        _id: user._id.toHexString(),
        exp, /// 30 Days
    }, secret).toString();

    user.tokens.push({
        token
    });

    return user.save({session});
};

/* refreshes token if it expires */
User.statics.refreshToken = function (user, session) {
    const token = jwt.sign({
        _id: user._id.toHexString(),
        exp, /// 30 Days
    }, secret).toString();

    user.tokens = [{
        token
    }];

    return this.findByIdAndUpdate(user._id, user).session(session);
};

User.statics.findByToken = function (token,session) {
    const user = this;
    const decoded = jwt.verify(token, secret);
    return user.findOne({
        "_id": decoded._id,
        "tokens.token": token,
    }).session(session);
};

module.exports = mongoose.model("User", User);
