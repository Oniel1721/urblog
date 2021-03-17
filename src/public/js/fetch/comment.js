import {getItem} from '../localStorage.js'
import {state, setState} from '../dom.js'

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
        state.comments = json
        setState(state)
    })
    .catch(err=>{
        console.log('terror: ',err)
    })
}

export const createComment = (target = null)=>{
    if(!target.classList.contains('comment-form')) return 0
    const data = new FormData(target)
    let postId = target.parentNode.parentNode.id.slice(2)
    console.log(postId)
    data.set('postId', postId)
    console.log('submitiando')
    fetch('/comment/create',{
        body: data,
        method: 'POST',
        headers: {
            'authentication': `Bearer ${getItem('token')}`
        }
    })
    .then(res=>res.json())
    .then(json=>{
        state.comments.push(json.comment)
        setState(state)
    })
    .catch(err=>{
        console.log('terror: ',err)
    })
}