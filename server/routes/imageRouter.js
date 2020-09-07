const mongoose = require('mongoose');
const imageRouter = require('express').Router();
const auth = require('./authRouter');
const imageController = require('../controllers/imageController');
const Image = mongoose.model('Image');
const User = mongoose.model('User');
const upload = imageController.upload;

// : /image...

// upload a single photo to the database :/upload


imageRouter.post('/upload',imageController.upload.single('file'),auth.optional, (req,res) => {
  User.findById(req.payload.id)
      .then(function (user) {
        const image = new Image(req.body);
        image.user = user;
        image.fileId = req.file.id;
        image.save();
      });
});

//get all image of an user :/
imageRouter.get('/',auth.optional, (req,res)=>{
  imageController.getAllImage(req, res);
});

// get one image by filename :/:filename
imageRouter.get('/:filename',auth.optional, (req, res) => {
  imageController.getOneImage(req, res);
});

module.exports = imageRouter;