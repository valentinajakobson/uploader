const express = require('express'); //Express Web Server 
const multer = require('multer');   //middleware for form/file upload and handeling multipart/form-data
const cors = require('cors');   //handles cross origin http requests
const path = require('path');   //used for file path
const fs = require('fs-extra'); //File System - for file manipulation

const port = process.env.PORT || 3001; 
const app = express();


app.use(cors());
app.use(express.static(path.join(__dirname, 'server/uploads')));

//configuring Multer to use files directory for storing files
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'server/uploads')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});

const upload = multer({storage:storage}).single('file');

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

//GET method to handle fetching files and sending them to browser
app.get('/fetch', (req, res) => {
    let files = fs.readdirSync(path.resolve("server/uploads"));
    res.send(files);
    });

app.listen(port, () => console.log(`Server is running on port ${port}!`));
