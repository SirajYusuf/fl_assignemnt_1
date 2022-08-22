const mongoose = require("mongoose");

const Comment = new mongoose.Schema(
  {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        default: null
    },
    userName:{
        type: String,
        default: null
    },
    comment: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


module.exports = mongoose.model("Comment", Comment);