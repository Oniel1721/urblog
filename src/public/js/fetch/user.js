import {setItem, getItem,deleteItem} from '../localStorage.js'

const d = document,
$login = d.getElementById('login'),
$erase = d.getElementById('erase'),
$edit = d.getElementById('edit')

export const logout = ()=>{
    deleteItem('token')
    // reload page
}

export const erase = ()=>{
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

export const edit = ()=>{
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

export const login= ()=>{
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