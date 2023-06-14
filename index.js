const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejs = require("ejs");
const path = require("path");
const Post = require("./models/Post");
const fs = require("fs");
const app = express();
const postControllers = require("./controllers/postControllers");
const pageControllers = require("./controllers/pageControllers");

//connect DB

mongoose.connect(
  "mongodb+srv://ilker:9nNx4kjznO2bqX8u@atlascluster.atme0jg.mongodb.net/cleanblog-test-db?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//Template engine
app.set("view engine", "ejs");

//Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//Routes

app.get("/", postControllers.getAllPosts);
app.get("/posts/:id", postControllers.getPost);
app.get("/about", pageControllers.getAboutPage);
app.get("/add", pageControllers.getAddPage);
app.post("/posts", postControllers.createPost);
app.get("/posts/edit/:id", pageControllers.getEditPage);
app.put("/posts/:id", postControllers.updatePost);
app.delete("/posts/:id", postControllers.deletePost);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi..`);
});
