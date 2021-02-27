const express = require('express')
const formidable = require('express-formidable')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()

app.set('port', process.env.PORT || 4000)

app.use(cors())
app.use(morgan('dev'))
app.use(formidable())

app.use(require('./router/pages.js'))

app.listen(app.get('port'),()=>{
    console.log('server on port ', app.get('port'))
    require('./db_connection.js')
})
