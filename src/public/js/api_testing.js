import {loginUser, editUser, eraseUser, logoutUser} from './test/user.js'
import {createPost, editPost, erasePost, getPosts } from './test/post.js'
import {createComment, getComments, editComment, eraseComment} from './test/comment.js'


const d = document,
$logs = d.getElementById('logs')


const log = (err, msg)=>{
    let $p = d.createElement('p')
    $p.classList.add('log')
    if(err) $p.classList.add('error')
    $p.textContent = msg
    $logs.appendChild($p)
}



const tests = [
    {   method: 'loginUser',
        inputs:{
            username: 'tester',
            password: 'tester'
        },
        expects: true,
        expectsMsg: 'loged || user created'
    }
]




d.addEventListener("DOMContentLoaded", e=>{
    loginUser((err, msg)=>{
        log(err, msg)
    })
})