import { getItem } from './localStorage.js'
import {loginUser, editUser, eraseUser, logoutUser, signupUser, dataLoged} from './fetch/user.js'
import {createPost, editPost, erasePost, getPosts } from './fetch/post.js'
import {createComment, getComments, editComment, eraseComment} from './fetch/comment.js'
import {mostFilterBtn, commentBtn, cancelComment, activeMenu, fullPost, loginBtn, signupBtn, showPostForm} from './transitions/transitions.js'
import { categoryFilter, searchFilter } from './dom.js'

const d = document,
w = window,
$goTop = d.getElementById('go-top'),
$categoryFilter = d.querySelector('.category-filter select'),
$searchFilter = d.querySelector('.search-filter input')

const scrollTop = (target)=>{
    if(target === $goTop || $goTop.contains(target)){
        w.scrollTo({
            behavior: "smooth",
            top: 0
        })
        activeMenu(d.querySelector('.menu-switch'))
    }
}

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

        // createComment(e.target)
        // editComment(e.target)
        // eraseComment(e.target)
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
        scrollTop(e.target)
        showPostForm(e.target)
    })

    d.addEventListener('keyup', e=>{
        if(e.target === $searchFilter){
            searchFilter($searchFilter.value)
        }
    })

    dataLoged()
    getPosts('')
    getComments('')
})

$categoryFilter.addEventListener('change', e=>{
    categoryFilter($categoryFilter.value)
})

w.addEventListener("scroll", e=> {
    let scrollTop = w.pageYOffset || d.documentElement.scrollTop;
    if(scrollTop >= 600){
        $goTop.classList.remove('hide')
    }
    else{
        $goTop.classList.add('hide')
    }
})



