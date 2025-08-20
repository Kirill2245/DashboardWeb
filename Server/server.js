const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const https = require('https');
const fs = require('fs');
const path = require('path');
const UsersRoute = require('./src/routes/UsersRoutes');
const TaskRoute = require('./src/routes/TaskRoutes');
const ProductRoute = require('./src/routes/ProductRoutes');
const CustomerRoute = require('./src/routes/CustomerRoutes');
const InvoiceRoute = require('./src/routes/InvoiceRoutes');
const PORT = 5000;

mongoose.connect('mongodb://mongo:27017/mainDateBase')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();

app.use(cors({
    origin: ['https://localhost', 'https://frontend'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

const uploadsDir = path.join(__dirname, 'Server', 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log(`Created uploads directory at: ${uploadsDir}`);
}


app.use('/uploads', express.static(uploadsDir, {
    setHeaders: (res, filePath) => {
    },
    fallthrough: false 
}));


app.get('/api/images/:filename', (req, res) => {
    const filename = req.params.filename;
    if (!/^[a-zA-Z0-9\-\._]+$/.test(filename)) {
        return res.status(400).json({ error: 'Invalid filename' });
    }
    
    const filePath = path.join(uploadsDir, filename);

    console.log(`Attempting to serve: ${filePath}`);

    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath);
        return res.status(404).json({ 
            error: 'Image not found',
            availableFiles: fs.readdirSync(uploadsDir)
        });
    }

    res.sendFile(filePath, { 
        headers: {
            'Cache-Control': 'public, max-age=31536000' 
        }
    });
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/users', UsersRoute);
app.use('/api/task', TaskRoute);
app.use('/api/product', ProductRoute);
app.use('/api/customer', CustomerRoute);
app.use('/api/invoice', InvoiceRoute);


const sslKeyPath = '/ssl/localhost.key';
const sslCertPath = '/ssl/localhost.crt';

if (!fs.existsSync(sslKeyPath) || !fs.existsSync(sslCertPath)) {
    console.error('SSL certificates not found!');
    process.exit(1);
}

const sslOptions = {
    key: fs.readFileSync(sslKeyPath),
    cert: fs.readFileSync(sslCertPath)
};

https.createServer(sslOptions, app).listen(PORT, '0.0.0.0', () => {
    console.log(`HTTPS server running on port ${PORT}`);
});


app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});