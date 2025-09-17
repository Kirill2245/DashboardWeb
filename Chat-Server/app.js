const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/ChatRoutes');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(cors({
    origin: ['https://localhost', 'https://frontend'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(routes);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/chat/', routes)
app.get('/api/chat/test',(req,res) => {
    return res.status(201).json({message: "Server is running!"})
})

module.exports = app;