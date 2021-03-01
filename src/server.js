const express = require('express')
const formidable = require('express-formidable')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

const app = express()

app.set('port', process.env.PORT || 4000)

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(formidable())

// david 1234
// post id = 603cf122083056025c18b60d
// comment id = 603cf789028227067ce8cf04

// odri 4321
// comment id = 603cf80c6f5ef31bb4f52fd0

// Routers
app.use(express.static(path.join(__dirname, './public')))
app.use('/user',require('./router/user_routes.js'))
app.use('/post',require('./router/post_routes.js'))
app.use('/comment',require('./router/comment_routes.js'))

// app.use(require('./router/pages.js'))




app.listen(app.get('port'),()=>{
    console.log('server on port ', app.get('port'))
    require('./db_connection.js')
})
