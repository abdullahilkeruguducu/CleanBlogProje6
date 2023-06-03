const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const Post = require("./models/Post");

const app = express();

//connect DB

mongoose.connect("mongodb://127.0.0.1:27017/cleanblog-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template engine
app.set("view engine", "ejs");

//Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes

app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index", {
    posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add_post");
});

app.post("/posts", async (req, res) => {
  console.log(req.body);
  Post.create(req.body);
  res.redirect("/");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi..`);
});
