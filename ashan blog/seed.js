const mongoose = require("mongoose");

const Recepie = require("./models/Recepie");
const Blogs = require("./models/Blogs");

//connect to mongoDB
mongoose
  .connect("mongodb://localhost:27017/recepieV2")
  //mongodb://localhost:27017
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) => {
    console.log(`Oh No ERROR!`);
    console.log(err);
  });

const blog = new Blogs({


  
  title: "sampleBlogTitle",

  description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime eaque inventore, consequatur deleniti molestias quaerat aperiam quo dignissimos exercitationem nulla quae quibusdam ipsum porro repellat cum sit at dolores pariatur.",

  author: "CJ",

  image: "https://i.pinimg.com/originals/e9/38/fb/e938fb109435cb8403b1eeaec02a77d9.jpg",

  createdDate: "2022-06-30",
  
  category: "GTA san andreas",


});

blog.save();
