const CommentSchema = require('../models/Comment.js')

const getOneCommentById = async(_id) =>{
    const comment = await CommentSchema.findOne({_id})
    return comment
}

const getComments = async(filters = {}) =>{
    const comments = await CommentSchema.find(filters)
    return comments
}

const saveComment = async(data) =>{
    const newComment = new CommentSchema(data)
    const comment = await newComment.save()
    return comment
}

const updateComment = async (id, data)=>{
    let newComment = {}
    // console.log({'en get: ':comment})
    for(let prop in data){
        newComment[prop] = data[prop]
    }
    const comment = await CommentSchema.updateOne(
        {_id: id},
        {
            $set: newComment
        })
    return comment
}

const eraseComment = async (id)=>{
    const ans = await CommentSchema.deleteOne({_id: id})
    return ans
}

module.exports = {
    getOneCommentById,
    getComments,
    saveComment,
    updateComment,
    eraseComment
}