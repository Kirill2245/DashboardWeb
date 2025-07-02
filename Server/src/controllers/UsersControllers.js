const Users = require('../models/Users')


const index = (req, res, next) => {
    Users.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => { 
        res.json({
            message: `Error on ${error}`
        })
    })
}
const signUp = (req, res, next) => {
    let user = new Users({
        name:req.body.name,
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password
    })
    user.save()
    .then(response => {
        res.json({
            message: `Save`
        })
    })
    .catch(error => { 
        res.json({
            message: `Error on ${error}`
        })
    })
}
module.exports = {
    index,signUp
}