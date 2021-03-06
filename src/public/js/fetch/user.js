import {setItem, getItem,deleteItem} from '../localStorage.js'
import { fadeScreenHide, alertMsg } from '../transitions/transitions.js'

const d = document,
$login = d.getElementById('login-form'),
$signup = d.getElementById('signup-form'),
$logout = d.getElementById('logout-btn'),
$edit = null,
$erase = null

export const dataLoged = ()=>{
    if(getItem('token')){
        d.querySelectorAll('[data-loged="true"').forEach(el=>{
            el.classList.remove('display-none')
        })
        d.querySelectorAll('[data-loged="false"').forEach(el=>{
            el.classList.add('display-none')
        })
    }
    else{
        d.querySelectorAll('[data-loged="true"').forEach(el=>{
            el.classList.add('display-none')
        })
        d.querySelectorAll('[data-loged="false"').forEach(el=>{
            el.classList.remove('display-none')
        })
    }
}


export const logoutUser = (target)=>{
    if(target === $logout){
        deleteItem('token')
        dataLoged()
        alertMsg('user logout', true)
    }
    // reload page
}

export const eraseUser = (target)=>{
    if(target !== $erase) return 0
    const data = new FormData($erase)
    fetch('/user/erase',{
        body: data,
        method: 'DELETE',
        headers: {
            'authentication': `Bearer ${getItem('token')}`
        }
    })
    .then(res=>res.json())
    .then(json=>{
        console.log({"erase-msg: ":json})
        if(json.ok){
            deleteItem('token')
        }
    })
    .catch(err=>{
        console.log('terror: ',err)
    })
}

export const editUser = (target)=>{
    if(target !== $edit) return 0
    const data = new FormData($edit)
    // data.set('token', getItem('token'))
    fetch('/user/edit',{
        body: data,
        method: 'PUT',
        headers: {
            'authentication': `Bearer ${getItem('token')}`
        }
    })
    .then(res=>res.json())
    .then(json=>{
        console.log({"edit-msg: ":json})
        if(json.token){
            setItem('token', json.token)
        }
    })
    .catch(err=>{
        console.log('terror: ',err)
    })
}

export const loginUser= (target)=>{
    if(target !== $login) return 0
    const data = new FormData($login)
    fetch('/user/login',{
        body: data,
        method: 'POST'
    })
    .then(res=>res.json())
    .then(json=>{
        console.log({"login-msg: ":json})
        if(json.token){
            setItem('token', json.token)
            fadeScreenHide(d.querySelector('.fade-screen'))
            alertMsg(json.msg, true)
            dataLoged()
        }
        else{
            alertMsg(json.msg)
        }
    })
    .catch(err=>{
        console.log('terror: ',err)
    })
}

export const signupUser= (target)=>{
    if(target !== $signup) return 0
    const data = new FormData($signup)
    fetch('/user/signup',{
        body: data,
        method: 'POST'
    })
    .then(res=>res.json())
    .then(json=>{
        console.log({"login-msg: ":json})
        if(json.token){
            setItem('token', json.token)
            fadeScreenHide(d.querySelector('.fade-screen'))
            alertMsg(json.msg, true)
            dataLoged()
        }
        else{
            alertMsg(json.msg)
        }
    })
    .catch(err=>{
        console.log('terror: ',err)
    })
}