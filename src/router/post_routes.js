const jwt = require('jsonwebtoken')
const Router = require('express').Router()
const { savePost, updatePost, erasePost, getPosts, getOnePostById } = require('../controller/post_controller.js')

const verifyUser = (req, res, next)=>{
    const token = req.headers['authentication'].split(' ')[1]
    if(`${token}`.split('.').length===3){
        let uncoded = jwt.decode(token)
        req.fields.owner = uncoded.name
        req.verified = {
            ok: true,
            msg: 'access',
            ...uncoded
        }
        next()
    }
    else{
        req.verified = {
            ok: false,
            msg: 'doest have token'
        }
        next()
    }
}

Router.get('/get', (req, res)=>{
    getPosts(req.query)
    .then(post=>{
        res.json(post)
    })
    .catch(err=>{
        console.error('get Posts: ', err)
        res.json({msg: 'error getting post'})
    })
})

Router.post('/create', verifyUser, (req, res)=>{
    if(req.verified.ok){
        savePost(req.fields)
        .then(post=>{
            let answer = {
                post,
                ok: true,
                msg: 'post created'
            }
            res.json(answer)
        })
        .catch(err=>{
            console.error('save Post: ', err)
            res.json({msg: 'error saving post'})
        })
    }
    else{
        res.json(req.verified)
    }
})

Router.put('/edit', verifyUser, (req, res)=>{
    if(req.verified.ok){
        getOnePostById({"_id":req.fields._id})
        .then(post=>{
            let answer = {}
            if(post.owner === req.verified.name){
                updatePost(req.fields._id,req.fields)
                .then(post=>{
                    answer = {
                        post,
                        ok: true,
                        msg: 'post updated'
                    }
                    res.json(answer)
                })
                .catch(err=>{
                    console.error('erase Post error: ', err)
                    res.json({msg: 'error erasing post'})
                })
            }
            else{
                answer.ok = false
                answer.msg = "user not allowed"
                res.json(answer)
            }
        })
        .catch(err=>{
            console.error('get Posts error: ', err)
            res.json({msg: 'error getting post'})
        })
    }
    else{
        res.json(req.verified)
    }
})

Router.delete('/erase',verifyUser,(req, res)=>{
    if(req.verified.ok){
        getOnePostById({"_id":req.fields._id})
        .then(post=>{
            let answer = {}
            if(post.owner === req.verified.name){
                erasePost(post._id)
                .then(info=>{
                    if(!info.deletedCount){
                        answer.ok = false
                        answer.msg = "post doest exist"
                        res.json(answer)
                    }
                    else{
                        answer.ok = true
                        answer.msg = "post erased"
                        res.json(answer)
                    }
                })
                .catch(err=>{
                    console.error('erase Post error: ', err)
                    res.json({msg: 'error erasing post'})
                })
            }
            else{
                answer.ok = false
                answer.msg = "user not allowed"
                res.json(answer)
            }
        })
        .catch(err=>{
            console.error('get Posts error: ', err)
            res.json({msg: 'error getting post'})
        })
    }
    else{
        res.json(req.verified)
    }
})

module.exports = Router