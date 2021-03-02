const express = require('express')
const formidable = require('express-formidable')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const jwt = require('jsonwebtoken')

const app = express()

app.set('port', process.env.PORT || 4000)

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(formidable())

// Routers
app.use(express.static(path.join(__dirname, './public')))
app.use('/user',require('./router/user_routes.js'))
app.use('/post',require('./router/post_routes.js'))
app.use('/comment',require('./router/comment_routes.js'))
app.get('/test', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/test.html'))
})


app.listen(app.get('port'),()=>{
    console.log('server on port ', app.get('port'))
    require('./db_connection.js')
})
