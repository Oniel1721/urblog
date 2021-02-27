const Router = require('express').Router()
const {  } = require('../controller/users.js')

Router.post('/new', (req, res)=>{
    res.json({ok:"klk"})
})

module.exports = Router