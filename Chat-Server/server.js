const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const PORT = 5001;

const app = express();
mongoose.connect('mongodb://mongo:27017/mainDateBase')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({
    origin: ['https://localhost', 'https://frontend'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

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

app.get('/api/chat/test',(req,res) => {
    return res.status(201).json({message: "Server is running!"})
})