const express = require('express')
const formidable = require('express-formidable')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.set('port', process.env.PORT || 4000)

app.use(cors())

app.listen(app.get('port'),()=>{
    console.log('server on port ', app.get('port'))
    
})
