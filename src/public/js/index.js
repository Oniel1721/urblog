import {login, edit, erase, logout} from './fetch/user.js'

const d = document,
$login = d.getElementById('login'),
$logout = d.getElementById('logout'),
$erase = d.getElementById('erase'),
$edit = d.getElementById('edit')

d.addEventListener('submit', e=>{
    e.preventDefault()
    if(e.target === $login){
        login()
    }
    if(e.target === $edit){
        edit()
    }
    if(e.target === $erase){
        erase()
    }
})

d.addEventListener('click', e=>{
    // e.preventDefault()
    if(e.target === $logout){
        logout()
    }
})
