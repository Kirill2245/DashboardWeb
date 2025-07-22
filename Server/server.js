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

const PORT = 5000;

mongoose.connect('mongodb://mongo:27017/mainDateBase')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();


app.use(cors({
    origin: ['https://localhost', 'https://frontend'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/users', UsersRoute);
app.use('/api/task', TaskRoute);
app.use('/api/product', ProductRoute);
app.use('/api/customer', CustomerRoute);
const sslOptions = {
    key: fs.readFileSync('/ssl/localhost.key'),
    cert: fs.readFileSync('/ssl/localhost.crt')
};
https.createServer(sslOptions, app).listen(5000, '0.0.0.0', () => {
    console.log('HTTPS server running on port 5000');
});