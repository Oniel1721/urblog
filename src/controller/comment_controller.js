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

const updateComment = async (_id, data)=>{
    let newComment = {}
    for(let prop in data){
        if(newComment[prop]){
            newComment[prop] = data[prop]
        }
    }
    const comment = await CommentSchema.updateOne(
        {_id},
        {
            $set: newComment
        })
    return comment
}

const eraseComment = async (_id)=>{
    const ans = await CommentSchema.deleteOne({_id})
    return ans
}

const eraseCommentsOfPost = async (postId)=>{
    const ans = await CommentSchema.deleteMany({postId})
    return ans
}

const eraseCommentsOfUser = async (owner)=>{
    const ans = await CommentSchema.deleteMany({owner})
    return ans
}

const updateCommentOwners = async(oldOwner = '', newOwner = '')=>{
    if(oldOwner && newOwner){
        let info = await CommentSchema.updateMany(
            {owner: oldOwner},
            {
                $set: {owner: newOwner}
            })
        return info
    }
    else{
        return null
    }
}

module.exports = {
    getOneCommentById,
    getComments,
    saveComment,
    updateComment,
    eraseComment,
    eraseCommentsOfPost,
    updateCommentOwners,
    eraseCommentsOfUser
}