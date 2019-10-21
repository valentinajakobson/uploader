const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const pino = require('express-pino-logger')();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.use(cors());

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + '-' +file.originalname)
    }
})

const upload = multer({storage:storage}).single('file')

app.post('/upload', function(req,res){
    upload(req, res, function(err){
        if(err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
})

const port = process.env.PORT || 3001; 
app.listen(port, () => console.log(`Server is running on port ${port}!`));
