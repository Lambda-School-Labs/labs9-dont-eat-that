const express = require('express');
const db = require('../data/dbConfig');
const multer = require('multer');
const multerS3 = require('multer-S3');
const aws = require('aws-sdk');
// let upload = require('multer');


require('dotenv').config();

const router = express.Router();

// router.
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-1',
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'medium-test',
        acl: 'public-read',
        metadata: function (req,file,cb) {
            cb(null, {fieldName:file.fieldname});
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

const singleUpload = upload.single('image');

router.post('/', function(req,res) {
    singleUpload(req, res, function(err, some) {
        if(err){
            return res.status(422).send({errors:[{title: 'Image Upload Error', detail: err.message}]});
        }
        return res.json({'imageUrl':req.file.location});
    });
})




module.exports = router;