require('dotenv')
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


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
User.methods.generateToken = function () {
    let user = this;
    const token = jwt.sign({
        _id: user._id.toHexString(),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), /// 30 Days
    }, secret).toString();

    user.tokens.push({
        token
    });

    return user.save().then(() => {
        return user;
    });
};

/* refreshes token if it expires */
User.statics.refreshToken = function (user) {
    const token = jwt.sign({
        _id: user._id.toHexString(),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), /// 30 Days
    }, secret).toString();

    user.tokens = [{
        token
    }];

    return this.findByIdAndUpdate(user._id, user);
};

User.statics.findByToken = function (token) {
    const user = this;
    const decoded = jwt.verify(token, secret);
    return user.findOne({
        "_id": decoded._id,
        "tokens.token": token,
    });
};

module.exports = mongoose.model("User", User);
