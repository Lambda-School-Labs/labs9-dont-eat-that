const express = require('express');
const db = require('../data/dbConfig');
const multer = require('multer');
const multerS3 = require('multer-S3');
const aws = require('aws-sdk');


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

module.exports = upload;