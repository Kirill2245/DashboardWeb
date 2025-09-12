const express = require('express');
const cors = require('cors');
// const routes = require('./routes');

const app = express();

app.use(cors({
    origin: ['https://localhost', 'https://frontend'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
// app.use(routes);

app.get('/api/chat/test',(req,res) => {
    return res.status(201).json({message: "Server is running!"})
})

module.exports = app;