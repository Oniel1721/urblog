import {getItem, setItem} from '../localStorage.js'
import { createComment } from '../fetch/comment.js'
import {showMorePost, setState} from '../dom.js'


const d = document

let $loginBtn= d.getElementById('login-btn'),
$loginForm = d.getElementById('login-form'),
$fadeScreen = d.querySelector('.fade-screen'),
$signupSpan = d.querySelector('#signup-form span'),
$signupBtn= d.getElementById('signup-btn'),
$signForm = d.getElementById('signup-form'),
$loginSpan = d.querySelector('#login-form span'),
$newPostBtn = d.getElementById('new-post-btn'),
$postForm = d.getElementById('post-form')


export const alertMsg = (msg = '', green = false)=>{
    let $alertMsg = d.querySelector('.alert-msg')
    $alertMsg.classList.add('show')
    $alertMsg.firstChild.textContent = msg.toUpperCase()
    if(green){
        $alertMsg.classList.add('green-alert')
    }
    else{
        $alertMsg.classList.remove('green-alert')
    }
    setTimeout(()=>{
        $alertMsg.classList.remove('show')
    }, 2000)
}


export const fadeScreenHide = ()=>{
    $fadeScreen.classList.remove('show')
    d.getElementById('signup-form').classList.remove('show')
    d.getElementById('login-form').classList.remove('show')
    d.getElementById('post-form').classList.remove('show')
}

export const loginBtn = (target)=>{
    if(!target) return 0
    if(target === $loginBtn || target === $signupSpan){
        $fadeScreen.classList.add('show')
        $loginForm.classList.add('show')
        $signupSpan.parentNode.parentNode.parentNode.classList.remove('show')
    }
    else if(target === $fadeScreen){
        fadeScreenHide($fadeScreen)
    }
}

const withOutAccount = (msg)=>{
    alertMsg('Sign In First')
    $fadeScreen.classList.add('show')
    $loginForm.classList.add('show') 
}

export const signupBtn = (target)=>{
    if(!target) return 0
    if(target === $signupBtn || target === $loginSpan){
        $fadeScreen.classList.add('show')
        $signForm.classList.add('show')
        $loginSpan.parentNode.parentNode.parentNode.classList.remove('show')
    }
    else if(target === $fadeScreen){
        fadeScreenHide($fadeScreen)
    }
}

export const showPostForm = (target)=>{
    if(!target) return 0
    if(target === $newPostBtn || $newPostBtn.contains(target)){
        if(getItem('token')){
            $fadeScreen.classList.add('show')
            $postForm.classList.add('show')
        }
        else{
            withOutAccount('Sign In First')
        }
        activeMenu(d.querySelector('.menu-switch'))
    }
    else if(target === $fadeScreen || target === $postForm.querySelector('button.red-bg')){
        fadeScreenHide($fadeScreen)
    }
}

export const mostFilterBtn = (target = null)=>{
    if(!target) return 0
    if(target.parentNode.classList.contains('most-filter')){
        d.querySelectorAll('.most-filter .btn')
        .forEach((filter)=>{
            if(filter === target){
                if(!filter.classList.contains('white-btn')){
                    target.classList.add('white-btn')
                    target.classList.remove('black-btn')
                    setItem('order', filter.textContent)
                    setState(false)
                }
            }
            else{
                filter.classList.add('black-btn')
                filter.classList.remove('white-btn')
            }
        })
    }
}

const hideForm = ()=>{
    let $textArea = d.querySelector('.comment-form textarea'),
    $cancelBtn = d.querySelector('.comment-form .cancel-btn')
    $textArea.classList.add('height-0')
    $textArea.value = ''
    $cancelBtn.classList.add('height-0')
    $cancelBtn.classList.add('hide')
    $textArea.classList.add('hide')
}

// const textAreaFocus = ()=>{
//     let $textArea = d.querySelector('.comment-form textarea')
//     let i = 0
//     let interval = setInterval(()=>{
//         $textArea.classList.toggle('cancel-btn')
//         if(i>5){
//             $textArea.classList.remove('cancel-btn')
//             clearInterval(interval)
//         }
//         i++
//     }, 125)
// }

export const commentBtn = (target = null)=>{
    if(!target) return 0
    if(target.classList.contains('comment-btn')){
        if(getItem('token')){
            if(d.querySelector('.comment-form .hide')){
                if(getItem('token')){
                    d.querySelectorAll('.comment-form .hide')
                    .forEach((el)=>{
                        el.classList.remove('hide')
                        el.classList.remove('height-0')
                    })
                }
            }
            else if(d.querySelector('.comment-form textarea').value){
                createComment(target.parentNode)
                hideForm()
            }
        }
        else{
            hideForm()
            withOutAccount()
        }
    }
}

export const cancelComment = (target = null)=>{
    if(!target) return 0
    if(target === d.querySelector('.comment-form .cancel-btn')){
        hideForm()
    }
}

export const activeMenu = (target = null)=>{
    if(!target) return 0
    let $switch = d.querySelector('.menu-switch')
    let $menuOptions = d.querySelectorAll('.menu-option')
    if(target === $switch || target.parentNode === $switch){
        for(let i = 0; i<$menuOptions.length; i++){
            if(i === $menuOptions.length-1){
                $switch.classList.toggle('rotate')
            }
            else{
                let className = `opt-${4-i}`
                $menuOptions[i].classList.toggle(className)
            }
        }
    }
}

export const fullPost = (target)=>{
    if(!target) return 0
    if(target.classList.contains('post-show-more')){
        let $fullPost = target.nextSibling
        let _id = target.parentNode.id
        if($fullPost.classList.contains('show')){
            target.textContent = 'show more'
            $fullPost.classList.remove('show')
            showMorePost(_id)
        }
        else{
            target.textContent = 'show less'
            $fullPost.classList.add('show')
            showMorePost(_id, true)
        }
    }
}