import {loginUser, editUser, eraseUser, logoutUser} from './fetch/user.js'
import {createPost, editPost, erasePost, getPosts } from './fetch/post.js'
import {createComment, getComments, editComment, eraseComment} from './fetch/comment.js'
import {mostFilterBtn, commentBtn, cancelComment, showHideComments, activeMenu} from './transitions/transitions.js'


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

        createComment(e.target)
        editComment(e.target)
        eraseComment(e.target)
    })
    
    d.addEventListener('click', e=>{
        logoutUser(e.target)
        mostFilterBtn(e.target)
        commentBtn(e.target)
        cancelComment(e.target)
        showHideComments(e.target)
        activeMenu(e.target)
    })
    // getPosts()
    // getComments()
})


