const express = require('express');//Express Web Server 
const multer = require('multer');  //middleware for form/file upload and handeling multipart/form-data
const cors = require('cors');
const path = require('path');     //used for file path
const fs = require('fs-extra');       //File System - for file manipulation

const port = process.env.PORT || 3001; 
const app = express();


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});


const upload = multer({storage:storage}).single('file');


app.get('/', function(req,res) {
    return res.send("hello from my app express server!")
});

// '/upload' to handle the Form submission (handle POST requests to /upload)
app.post('/upload', function(req,res){
    upload(req, res, function(err){
        if(err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
});


app.get("/fetch", (req, res) => {
    let files = fs.readdirSync(path.resolve("public/uploads"));
    res.send(files);
    });

app.listen(port, () => console.log(`Server is running on port ${port}!`));
