import {loginUser, editUser, eraseUser, logoutUser, signupUser} from './fetch/user.js'
import {createPost, editPost, erasePost, getPosts } from './fetch/post.js'
import {createComment, getComments, editComment, eraseComment} from './fetch/comment.js'
import {mostFilterBtn, commentBtn, cancelComment, activeMenu, fullPost, loginBtn, signupBtn} from './transitions/transitions.js'


const d = document

d.addEventListener("DOMContentLoaded", e=>{
    d.addEventListener('submit', e=>{
        e.preventDefault()
        signupUser(e.target)
        loginUser(e.target)
        editUser(e.target)
        eraseUser(e.target)
        
        editPost(e.target)
        createPost(e.target)
        erasePost(e.target)

        createComment(e.target)
        editComment(e.target)
        eraseComment(e.target)
    })
    
    d.addEventListener('click', e=>{
        logoutUser(e.target)
        mostFilterBtn(e.target)
        commentBtn(e.target)
        cancelComment(e.target)
        activeMenu(e.target)
        fullPost(e.target)
        loginBtn(e.target)
        signupBtn(e.target)
    })
    // getPosts()
    // getComments()
})


