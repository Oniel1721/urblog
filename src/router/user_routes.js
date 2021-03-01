const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Router = require('express').Router()
const { getUserByName, saveUser, updateUser, eraseUser } = require('../controller/user_controller.js')
const { updatePostOwners } = require('../controller/post_controller.js')
const { updateCommentOwners } = require('../controller/comment_controller.js')



const salt = 13

const verifyUser = (req, res, next)=>{
    const token = req.headers['authentication'].split(' ')[1]
    if(`${token}`.split('.').length===3){
        let uncoded = jwt.decode(token)
        if(uncoded.name === req.fields.username){
            getUserByName(req.fields.username)
            .then(user=>{
                if(!user){
                    req.verified = {
                        ok: false,
                        msg: 'user doesnt exist'
                    }
                }
                else if(bcrypt.compareSync(req.fields.password, user.password)){
                    req.verified = {
                        ok: true,
                        msg: 'alright',
                        id: uncoded.id
                    }
                }
                else{
                    req.verified = {
                        ok: false,
                        msg: 'wrong password'
                    }
                }
                next()
            })
            .catch(err=>{
                req.verified = {
                    ok: false,
                    msg: 'error verify'
                }
                console.error('get user verify', err)
                next()
            })
        }
        else{
            req.verified = {
                ok: false,
                msg: 'username and token doesnt match'
            }
            next()
        }  
    }
    else{
        req.verified = {
            ok: false,
            msg: 'doest have token'
        }
        next()
    }
}

Router.post('/login', (req, res)=>{
    getUserByName(req.fields.username)
    .then(user=>{
        if(!user){
            let password = bcrypt.hashSync(req.fields.password,salt)
            saveUser(req.fields.username, password)
            .then(user=>{
                let answer = {
                    msg: "user created",
                    token: jwt.sign({
                        name: user.username,
                        id: user._id
                    }, 'oniel1721'),
                    ok: true
                }
                res.json(answer)
            })
            .catch(err=>{
                console.error('saveUser error: ',err)
                res.json({msg: "error creating user"})
            })
        }
        else{
            if(bcrypt.compareSync(req.fields.password, user.password)){
                let answer = {
                    msg: "loged",
                    token: jwt.sign({
                        name: user.username,
                        id: user._id
                    }, 'oniel1721'),
                    ok: true
                }
                res.json(answer)
            }
            else{
                res.json({msg: "Incorrect Password"})
            }
        }
    })
    .catch(err=>{
        console.error('getUser error: ',err)
        res.json({msg: "error getting user"})
    })
})

// Router.post('/verify', verifyUser ,(req, res)=>{
//     res.json(req.verified)
// })

Router.put('/edit', verifyUser, (req, res)=>{
    if(!req.fields.npassword && !req.fields.nusername){
        req.verified = {
            ok: false,
            msg: 'nothing for update'
        }
    }
    if(req.verified.ok){
        let newUser = {}
        if(req.fields.nusername){
            newUser.username = req.fields.nusername
        }
        if(req.fields.npassword){
            newUser.password = bcrypt.hashSync(req.fields.npassword,salt)
        }
        if(newUser.username){
            updateCommentOwners(req.fields.username, newUser.username)
            .then(info=>{
                updatePostOwners(req.fields.username, newUser.username)
                .then(info=>{
                    updateUser(req.verified.id, newUser)
                    .then(user=>{
                        console.log({'en update': user})
                        let answer = {
                            msg: "user updated",
                            token: jwt.sign({
                                name: newUser.username,
                                id: req.verified.id
                            }, 'oniel1721'),
                            ok: true
                        }
                        res.json(answer)
                    })
                    .catch(err=>{
                        console.error('updateUser error: ',err)
                        res.json({msg: "error updating user"})
                    })
                })
                .catch(err=>{
                    console.error('updatePostOwners error: ',err)
                    res.json({msg: "error updating postOwners"})
                })
            })
            .catch(err=>{
                console.error('updateCommentOwners error: ',err)
                res.json({msg: "error updating commentOwners"})
            })
        }
        else{
            updateUser(req.verified.id, newUser, req.fields.username)
            .then(user=>{
                console.log({'en update': user})
                let answer = {
                    msg: "user updated",
                    ok: true
                }
                res.json(answer)
            })
            .catch(err=>{
                console.error('updateUser error: ',err)
                res.json({msg: "error updating user"})
            })
        }
    }
    else{
        res.json(req.verified)
    }
})

Router.delete('/erase',verifyUser,(req, res)=>{
    if(req.verified.ok){
        eraseUser(req.verified.id, req.fields.username)
        .then(ans=>{
            res.json({ok: true, msg: "user erased"})
        })
        .catch(err=>{
            console.error('eraseUser error: ', err)
            res.json({msg: "error erasing user"})
        })
    }
    else{
        res.json(req.verified)
    }
})

module.exports = Router