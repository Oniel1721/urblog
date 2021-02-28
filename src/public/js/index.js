import {loginUser, editUser, eraseUser, logoutUser} from './fetch/user.js'
import {createPost, editPost, erasePost, getPosts } from './fetch/post.js'


const d = document

d.addEventListener("DOMContentLoaded", e=>{
    d.addEventListener('submit', e=>{
        e.preventDefault()
        loginUser(e.target)
        editUser(e.target)
        eraseUser(e.target)
        
        editPost(e.target)
        createPost(e.target)
        erasePost(e.target)
    })
    
    d.addEventListener('click', e=>{
        logoutUser(e.target)
    })
    getPosts()
})

