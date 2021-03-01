import {getItem} from '../localStorage.js'

const d = document,
$create = d.getElementById('comment-create'),
$erase = d.getElementById('comment-erase'),
$edit = d.getElementById('comment-edit')

export const eraseComment = (target)=>{
    if(target !== $erase) return 0
    const data = new FormData($erase)
    fetch('/comment/erase',{
        body: data,
        method: 'DELETE',
        headers: {
            'authentication': `Bearer ${getItem('token')}`
        }
    })
    .then(res=>res.json())
    .then(json=>{
        console.log({"erase-msg: ":json})
    })
    .catch(err=>{
        console.log('terror: ',err)
    })
}

export const editComment = (target)=>{
    if(target !== $edit) return 0
    const data = new FormData($edit)
    fetch('/comment/edit',{
        body: data,
        method: 'PUT',
        headers: {
            'authentication': `Bearer ${getItem('token')}`
        }
    })
    .then(res=>res.json())
    .then(json=>{
        console.log({"edit-msg: ":json})
    })
    .catch(err=>{
        console.log('terror: ',err)
    })
}

export const getComments = (query = '')=>{
    fetch(`/comment/get?${query}`)
    .then(res=>res.json())
    .then(json=>{
        console.log({"get-msg: ":json})
    })
    .catch(err=>{
        console.log('terror: ',err)
    })
}

export const createComment = (target)=>{
    if(target !== $create) return 0
    const data = new FormData($create)
    fetch('/comment/create',{
        body: data,
        method: 'POST',
        headers: {
            'authentication': `Bearer ${getItem('token')}`
        }
    })
    .then(res=>res.json())
    .then(json=>{
        console.log({"create-msg: ":json})
    })
    .catch(err=>{
        console.log('terror: ',err)
    })
}