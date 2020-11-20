const express = require('express');
const router  = express.Router();

const User = require('../models/User.model');

const uploader = require("../config/cloudinary.config.js")

router.get('/', (req, res, next) => {
  User.findById(req.session.user._id)
  .then(user => {
    res.render('profile', { user });
  }) 
});

router.get("/edit", (req, res, next) => {
  res.render("profile-edit")
})

router.post("/upload-profile-pic", uploader.single("imageUrl"), (req, res, next) => {
  console.log("the file is:", req.file)

  User.findByIdAndUpdate(req.session.user._id, {profilePic: req.file.path})
  .then(() => {
    res.redirect("/profile")
  })
})

router.post("/add-image", uploader.single("imageUrl"), (req, res, next) => {
  console.log("the file is:", req.file)

  User.findByIdAndUpdate(req.session.user._id, {$push: {images: req.file.path}})
  .then(() => {
    res.redirect("/profile")
  })
})

module.exports = router;
