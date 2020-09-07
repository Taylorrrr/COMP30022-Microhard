const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const Image = mongoose.model('Image');
const User = mongoose.model('User');
//file transfer database
const conn = mongoose.createConnection(process.env.DATABASE);
let gfs;
conn.once('open',() => {
  //Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})


//connect to storage
const storage = new GridFsStorage({
    url: process.env.DATABASE,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          };
          resolve(fileInfo);
        });
      });
    }
  });
const upload = multer({ storage });

//get all Image
const getAllImage = (req, res) => {
  User.findById(req.payload.id).then(function(user){
    if (!user){
      return res.sendStatus(401).send('The user does not exist.');
    }
    Image.find({user: user._id}).distinct('fileId').then(function(image){
      console.log(image);
      gfs.files.find({_id: {$in: image}}).toArray((err,files)=>{
        if(!files || files.length ===0){
          return res.json({
            files: false
          });
        }else{
          files.map(file=>{
            if(file.contentType ==="image/jpeg" || file.contentType === 'image/png')
            {
              file.isImage = true;
            } else {
              file.isImage = false;
            }
          });
          var imgPath = [];
          for(file of files){
            if(file.isImage){
              imgPath.push("/api/image/"+file.filename);
            }
          }
          return res.json({'files': imgPath});
        }
      });
    });
  });
  

}

//get specific image by filename
const getOneImage = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
}


module.exports = {
  upload,
  getAllImage,
  getOneImage,
};