const jwt = require('jsonwebtoken')
const Router = require('express').Router()
const { saveComment, getComments, getOneCommentById, updateComment, eraseComment } = require('../controller/comment_controller.js')

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
    getComments(req.query)
    .then(comments=>{
        res.json(comments)
    })
    .catch(err=>{
        console.error('get comments: ', err)
        res.json({msg: 'error getting comments'})
    })
})

Router.post('/create', verifyUser, (req, res)=>{
    if(req.verified.ok){
        saveComment(req.fields)
        .then(comment=>{
            let answer = {
                comment,
                ok: true,
                msg: 'comment created'
            }
            res.json(answer)
        })
        .catch(err=>{
            console.error('save comment: ', err)
            res.json({msg: 'error saving comment'})
        })
    }
    else{
        res.json(req.verified)
    }
})

Router.put('/edit', verifyUser, (req, res)=>{
    if(req.verified.ok){
        getOneCommentById({"_id":req.fields._id})
        .then(comment=>{
            let answer = {}
            // console.log({'en get':comment})
            if(comment.owner === req.verified.name){
                updateComment(req.fields._id,req.fields)
                .then(info=>{
                    // console.log({'en update':info})
                    answer = {
                        info,
                        ok: true,
                        msg: 'comment updated'
                    }
                    res.json(answer)
                })
                .catch(err=>{
                    console.error('update comment error: ', err)
                    res.json({msg: 'error updating comment'})
                })
            }
            else{
                answer.ok = false
                answer.msg = "user not allowed"
                res.json(answer)
            }
        })
        .catch(err=>{
            console.error('get comment error: ', err)
            res.json({msg: 'error getting comment'})
        })
    }
    else{
        res.json(req.verified)
    }
})

Router.delete('/erase',verifyUser,(req, res)=>{
    if(req.verified.ok){
        getOneCommentById({"_id":req.fields._id})
        .then(comment=>{
            let answer = {}
            if(comment.owner === req.verified.name){
                eraseComment(comment._id)
                .then(info=>{
                    if(!info.deletedCount){
                        answer.ok = false
                        answer.msg = "comment doest exist"
                        res.json(answer)
                    }
                    else{
                        answer.ok = true
                        answer.msg = "comment erased"
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
            console.error('get comment error: ', err)
            res.json({msg: 'error getting comment'})
        })
    }
    else{
        res.json(req.verified)
    }
})

module.exports = Router