const {Schema, model} = require('mongoose')

const PostSchema = new Schema({
    owner:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    topic:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    creationDate:{
        type: Date,
        default: Date.now()
    }
})

module.exports = model('Post', PostSchema)