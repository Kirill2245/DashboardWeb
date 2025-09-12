const app = require('./app');
const https = require('https');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const socketController = require('./src/controllers/socketController');

const PORT = 5001;

mongoose.connect('mongodb://mongo:27017/mainDateBase')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

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
const server = https.createServer(sslOptions, app);

const io = socketIo(server, {
    cors: {
        origin: ['https://localhost', 'https://frontend'],
        methods: ['GET', 'POST'],
        credentials: true
    }
});


socketController.handleConnection(io);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Chat service running on port ${PORT}`);
});