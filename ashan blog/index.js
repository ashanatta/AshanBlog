const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Blogs = require("./models/Blogs");
const app = express();

app.listen(8080, () => {
  console.clear();
  console.log(
    "_________________________________",
    "\n",
    "\n",
    "   SERVER STARTED (at 8080)"
  );
  console.log("_________________________________");
});

//connect to mongoDB ----------------------------------------------------
mongoose
  .connect("mongodb://0.0.0.0:27017/AshanBlogs")
  .then(() => {
    console.log("\n", "CONNECTED TO MongoDB");
  })
  .catch((err) => {
    console.clear();
    console.log(
      "---------<Getting error while connecting with mongoDB>-----------"
    );
    console.log(err);
  });

//over writing method----------------------------------------------------
app.use(methodOverride("_method"));

//parsing data form req.body --------------------------------------------
app.use(express.urlencoded({ extended: true }));

//static assets----------------------------------------------------------
app.use(express.static("public"));

//templating engine------------------------------------------------------
app.set("view engine", "ejs");

//home route-------------------------------------------------------------
app.get("/", async (req, res) => {
  try {
    const blogs = await Blogs.find()
      .sort([["_id", -1]])
      .limit(5);
    res.render("home", { blogs });
  } catch (error) {
    console.clear();
    console.log(
      "---------<Getting error while displaying home page>-----------"
    );
    res.send(error.message);
  }
});

//show blog page ---------------------------------------------------------
app.get("/blog", async (req, res) => {
  try {
    const blogs = await Blogs.find().sort([["_id", -1]]);
    res.render("blogs/blog", { blogs });
  } catch (error) {
    console.clear();
    console.log(
      "---------<Getting error while displaying blog page>-----------"
    );
    res.send(error.message);
  }
});

//render create new blog page ---------------------------------------------
app.get("/create_new_blog/new", (req, res) => {
  res.render("blogs/new");
});

//create new Blog ---------------------------------------------------------
app.post("/create_new_blog", async (req, res) => {
  const { title, description, author, image, createdDate, category } = req.body;
  console.log(createdDate);
  const blog = new Blogs({
    title,
    description,
    author,
    image,
    createdDate,
    category,
  });
  try {
    await blog.save();
    res.redirect("/blog");
  } catch (error) {
    console.clear();
    console.log("---------<Getting error while creating new blog>-----------");
    res.send(error.message);
  }
});

//show details page --------------------------------------------------------
app.get("/show_details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundBlog = await Blogs.findById(id);

    res.render("blogs/blog_detail", { foundBlog });
  } catch (error) {
    console.clear();
    console.log(
      "---------<Getting error while Showing blog in detail>-----------"
    );
    res.send(error.message);
  }
});

//search blog using category ------------------------------------------------
app.get("/search", async (req, res) => {
  const category = req.query.search;
  const foundBlogs = await Blogs.find({ category: category });
  res.render("blogs/search", { foundBlogs });
});

//First five blogs ----------------------------------------------------------
app.get("/first5blog", async (req, res) => {
  const firstFiveBlog = await Blogs.find().limit(5);
  res.render("blogs/first5blog", { firstFiveBlog });
});

//edit blog page -----------------------------------------------------------
app.get("/edit_blog/:id", async (req, res) => {
  const id = req.params.id;
  const foundBlog = await Blogs.findById(id);
  res.render("blogs/update", { foundBlog });
});

//update route --------------------------------------------------------------
app.patch("/update_blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBlog = await Blogs.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.redirect("/blog");
  } catch (error) {
    console.clear();
    console.log("---------<Getting error while updating blog>-----------");
    res.send(error.message);
  }
});

//Delete blog --------------------------------------------------------------
app.delete("/delete_blog/:id", async (req, res) => {
  try {
    await Blogs.findByIdAndDelete(req.params.id);
    res.redirect("/blog");
  } catch (error) {
    console.clear();
    console.log("---------<Getting error while deleting blog>-----------");
    res.send(error.message);
  }
});
