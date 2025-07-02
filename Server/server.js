const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const UsersRoute = require('./src/routes/UsersRoutes')

const PORT = 5000;

mongoose.connect('mongodb://mongo:27017/mainDateBase')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.listen(PORT, () => {
    console.log(`Open DateBase PORT = ${PORT}`)
})

app.use('/api/users', UsersRoute)