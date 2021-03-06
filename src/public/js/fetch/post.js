import {getItem} from '../localStorage.js'
import {fadeScreenHide} from '../transitions/transitions.js'
import {state, setState} from '../dom.js'

const d = document,
$create = d.getElementById('post-form'),
$erase = d.getElementById('post-erase'),
$edit = d.getElementById('post-edit')

export const erasePost = (target)=>{
    if(target !== $erase) return 0
    const data = new FormData($erase)
    fetch('/post/erase',{
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

export const editPost = (target)=>{
    if(target !== $edit) return 0
    const data = new FormData($edit)
    fetch('/post/edit',{
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

export const getPosts = (query = '', cb=null)=>{
    fetch(`/post/get?${query}`)
    .then(res=>res.json())
    .then(json=>{
        state.posts = json
        setState(state)
        if(cb){
            cb(json)
        }
    })
    .catch(err=>{
        console.log('terror: ',err)
    })
}

export const createPost = (target, cb = null)=>{
    if(target !== $create) return 0
    const data = new FormData($create)
    fetch('/post/create',{
        body: data,
        method: 'POST',
        headers: {
            'authentication': `Bearer ${getItem('token')}`
        }
    })
    .then(res=>res.json())
    .then(json=>{
        fadeScreenHide()
        $create.title.value = ''
        $create.topic.value = ''
        $create.content.value = ''
        state.posts.push(json.post)
        console.log(state)
        setState(state)
        if(cb){
            cb(json)
        }
        // console.log({"create-msg: ":json})
    })
    .catch(err=>{
        console.log('create post: ',err)
    })
}