const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const multer = require('multer');
const path = require('path');

// Configure Multer for local temp storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ensure this directory exists or use '/tmp'
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Append extension
    }
});

// Create uploads directory if it doesn't exist - usually handled in index.js or manually
// For now, we'll assume the user runs the server and we can check/create in index.js logic
// OR just use a simple config here.
const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

const upload = multer({ storage: storage });

// Routes
router.post('/upload', upload.single('image'), imageController.uploadImage);
// Reuse upload for update as per simple logic
router.post('/update', upload.single('image'), imageController.updateImage);

module.exports = router;
