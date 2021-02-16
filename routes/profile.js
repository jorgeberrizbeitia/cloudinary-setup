const express = require('express');
const router  = express.Router();

const User = require('../models/User.model');
const uploader = require('../middlewares/cloudinary.config');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/', (req, res, next) => {
  User.findById(req.session.user._id)
  .then(user => {
    console.log(user)
    res.render('profile', { user });
  }) 
});

router.get("/edit", (req, res, next) => {
  res.render("profile-edit")
})

router.post("/upload", uploader.single("imageUrl"), (req, res, next) => {
  User.findByIdAndUpdate(req.session.user._id, {profilePic: req.file.path})
  .then(() => {
    res.redirect("/profile")
  })
})

router.post("/pictures", isLoggedIn, uploader.single("picUrl"), (req, res, next) => {

  User.findByIdAndUpdate(req.session.user._id, {$push: {images: req.file.path}})
  .then(() => {
    res.redirect("/profile")
  })

})

module.exports = router;
