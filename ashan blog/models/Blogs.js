const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  author: {
    type: String,
  },

  image: {
    type: String,
  },
  createdDate: {
    type: String,
  },
  
  category: {
    type: String,
  },

});

const Blogs = mongoose.model("Blogs", blogsSchema);

module.exports = Blogs;
