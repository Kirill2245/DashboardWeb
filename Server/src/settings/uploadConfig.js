
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const rootDir = path.join(__dirname, '../..'); 
const uploadDir = path.join(rootDir, 'public', 'uploads');


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Created upload directory at: ${uploadDir}`);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, uploadDir); // Используем заранее созданную папку
},
    filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
}
});


const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
        return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
});

module.exports = upload;