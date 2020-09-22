var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

/**
 * storage
 */
var storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, './uploads');
  },
  filename: function(req, file, callback){
    callback(null, file.fieldname+"_"+ Date.now()+"_"+file.originalname);
  }
});

/**
 * upload
 */
var upload = multer({storage: storage}).array('file', 3);

app.get('/', function(req, res){
  res.sendFile('/index.html', { root: __dirname });
});

/**
 * upload post
 */
app.post('/api/Upload', function(req, res){
  try {
    upload(req, res, function(err){
      if(err){
        console.log("Err: ", err);
        return res.send({success: false, status: 200, message: "Something went wrong"});
      }
      return res.send({success: true, status: 200, message: "File uploaded successfully"});
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * listen port
 */
app.listen(3000, function(){
  console.log("Listen port: ", 3000);
});