const mongoose = require("mongoose");

const Blog = new mongoose.Schema(
  {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    userName:{
        type: String,
        default: null
    },
    title: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


module.exports = mongoose.model("Blog", Blog);