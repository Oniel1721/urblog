const {Schema, model} = require('mongoose')

const CommentSchema = new Schema({
    owner:{
        type: String,
        required: true
    },
    postId:{
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

module.exports = model('Comment', CommentSchema)