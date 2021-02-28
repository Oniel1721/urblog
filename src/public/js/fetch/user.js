import {setItem, getItem,deleteItem} from '../localStorage.js'

const d = document,
$login = d.getElementById('user-login'),
$erase = d.getElementById('user-erase'),
$edit = d.getElementById('user-edit'),
$logout = d.getElementById('logout')


export const logoutUser = (target)=>{
    if(target === $logout){
        deleteItem('token')
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
            // Permitir acceso
        }
    })
    .catch(err=>{
        console.log('terror: ',err)
    })
}