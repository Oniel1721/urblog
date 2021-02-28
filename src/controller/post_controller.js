const PostSchema = require('../models/Post.js')

const getOnePostById = async(filters = {}) =>{
    const post = await PostSchema.findOne(filters)
    return post
}

const getPosts = async(filters = {}) =>{
    const post = await PostSchema.find(filters)
    console.log({post})
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

const erasePost = async (id)=>{
    const ans = await PostSchema.deleteOne({_id: id})
    return ans
}

module.exports = {
    getPosts,
    savePost,
    updatePost,
    erasePost,
    getOnePostById
}