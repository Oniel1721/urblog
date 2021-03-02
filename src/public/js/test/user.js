import {setItem, getItem,deleteItem} from '../localStorage.js'

const d = document


export const logoutUser = (cb)=>{
        deleteItem('token')
        if(!getItem('token')){
            return cb(false, 'Token Eliminado')
        }
        return cb(true, 'Error eliminado token')
}

export const eraseUser = (cb)=>{
    const data = new FormData()
    data.set('username', 'tester1')
    data.set('password', 'tester1')
    fetch('/user/erase',{
        body: data,
        method: 'DELETE',
        headers: {
            'authentication': `Bearer ${getItem('token')}`
        }
    })
    .then(res=>res.json())
    .then(json=>{
        if(json.ok){
            deleteItem('token')
            return cb(false, json.msg)
        }
        else{
            return cb(false, json.msg)
        }
    })
    .catch(err=>{
        return cb(true, `Error erasing user ${err}`)
    })
}

export const editUser = (cb)=>{
    const data = new FormData()
    data.set('username', 'tester')
    data.set('password', 'tester')
    data.set('nusername', 'tester1')
    data.set('npassword', 'tester1')
    fetch('/user/edit',{
        body: data,
        method: 'PUT',
        headers: {
            'authentication': `Bearer ${getItem('token')}`
        }
    })
    .then(res=>res.json())
    .then(json=>{
        if(json.token){
            setItem('token', json.token)
            return cb(false, json.msg)
        }
        else{
            return cb(false, json.msg)
        }
    })
    .catch(err=>{
        return cb(true, `Error Editing user ${err}`)
    })
}

export const loginUser= (cb)=>{
    const data = new FormData()
    data.set('username','tester')
    data.set('password','tester')
    fetch('/user/login',{
        body: data,
        method: 'POST'
    })
    .then(res=>res.json())
    .then(json=>{
        // console.log({"login-msg: ":json})
        if(json.token){
            setItem('token', json.token)
            return cb(false, json.msg)
            // Permitir acceso
        }
        else{
            return cb(false, json.msg)
        }
    })
    .catch(err=>{
        return cb(true, `Error LoginUser ${err}`)
    })
}