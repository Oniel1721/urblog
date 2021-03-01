const PostSchema = require('../models/Post.js')
const {eraseCommentsOfPost} = require('./comment_controller.js')

const getOnePostById = async(filters = {}) =>{
    const post = await PostSchema.findOne(filters)
    return post
}

const getPosts = async(filters = {}) =>{
    const post = await PostSchema.find(filters)
    return post
}

const savePost = async(data) =>{
    const newPost = new PostSchema(data)
    const post = await newPost.save()
    return post
}

const updatePost = async (id, data)=>{
    let newPost = {}
    for(let prop in data){
        newPost[prop] = data[prop]
    }
    const post = await PostSchema.updateOne(
        {_id: id},
        {
            $set: newPost
        })
    return post
}

const updatePostOwners = async(oldOwner = '', newOwner = '')=>{
    if(oldOwner && newOwner){
        let info = await PostSchema.updateMany(
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

const erasePostOfUser = async (owner)=>{
    const ans = await PostSchema.deleteMany({owner})
    return ans
}

const erasePost = async (id)=>{
    await eraseCommentsOfPost(id)
    const ans = await PostSchema.deleteOne({_id: id})
    return ans
}

module.exports = {
    getPosts,
    savePost,
    updatePost,
    erasePost,
    getOnePostById,
    updatePostOwners,
    erasePostOfUser
}