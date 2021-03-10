import {setItem, getItem} from './localStorage.js'

const d = document,
$main = d.querySelector('main'),
$categoryFilter = d.querySelector('.category-filter select')

const inmutableState = {
    posts:[]
}

const formateDate = (creationDate = '')=>{
    // 2021-03-06T20:06:58.802Z
    let date = {
        date: creationDate.split('T')[0].split('-'),
        time: creationDate.split('T')[1].split('.')[0].split(':')
    }

    let now = {
        date: dayjs().format().split('T')[0].split('-'),
        time: dayjs().format().split('T')[1].split('-')[0].split(':')
    }

    for(let prop in date){
        for(let i = 0; i<3; i++){
            let dif = parseInt(now[prop][i]) - parseInt(date[prop][i])
            if(dif>0){
                let s = dif>1?'s':''
                if(prop === 'date'){
                    switch(i){
                        case 0: return `${dif} Year${s} ago.`
                            break;
                        case 1: return `${dif} Month${s} ago.`
                            break;
                        case 2: return `${dif} Day${s} ago.`
                            break;
                    }
                }
                else{
                    switch(i){
                        case 0: return `${dif} Hour${s} ago.`
                            break;
                        case 1: return `${dif} Minute${s} ago.`
                            break;
                        case 2: return `${dif} Second${s} ago.`
                            break;
                    }
                }
            }
        }
    }
}

export const appendPost = ({owner, _id, title, content = '', topic, creationDate})=>{
    let $post = d.createElement('div')
    let $title = d.createElement('h3')
    let $topic = d.createElement('h3')
    let $content = d.createElement('p')
    let $postInfo = d.createElement('div')
    let $date = d.createElement('p')
    let $owner = d.createElement('p')
    let $showMore = d.createElement('p')
    let $fullPost = d.createElement('div')
    
    $post.setAttribute('id', _id)
    $post.setAttribute('class', 'post gray-bg post-vw')
    $title.setAttribute('class', 'post-title white-c bold')
    $topic.setAttribute('class', 'post-topic white-c bold')
    $content.setAttribute('class', 'post-content gray-c')
    $postInfo.setAttribute('class', 'post-info')
    $date.setAttribute('class', 'post-date white-c')
    $owner.setAttribute('class', 'post-owner blue-c bold')
    $showMore.setAttribute('class', 'post-show-more bold white-c')
    $fullPost.setAttribute('class', 'full-post transition')

    $title.textContent = title
    $topic.textContent = topic
    $content.textContent = content.length>=255?`${content.slice(0,255)}...`:content
    // $date.textContent = formateDate(creationDate)
    $date.textContent = creationDate
    $owner.textContent = owner
    $showMore.textContent = 'show more'

    $post.appendChild($title)
    $post.appendChild($topic)
    $post.appendChild($content)
    $postInfo.appendChild($date)
    $postInfo.appendChild($owner)
    $post.appendChild($postInfo)
    $post.appendChild($showMore)
    $post.appendChild($fullPost)
    
    $main.appendChild($post)
}

export const showMorePost = (posts = null)=>{
    if(typeof posts === 'string'){
        let $post = d.getElementById(posts)
        let $content = $post.querySelector('.post-content')
        $content.textContent = $content.textContent.length>=255?`${$content.textContent.slice(0,255)}...`:$content.textContent
    }
    else if(posts){
        let {_id, content = ''} = posts[0]
        let $post = d.getElementById(_id)
        $post.querySelector('.post-content').textContent = content
    }
}

export const categoryFilter = (value = null)=>{
    d.querySelectorAll('.post-topic').forEach(el=>{
        if(!value) el.parentNode.classList.remove('display-none')
        else if(el.textContent === value){
            el.parentNode.classList.remove('display-none')
        }
        else{
            el.parentNode.classList.add('display-none')
        }
    })
}

export const searchFilter = (value = null)=>{
    d.querySelectorAll('.post').forEach(el=>{
        if(!value) el.classList.remove('display-none')
        else if(el.textContent.includes(value)){
            el.classList.remove('display-none')
        }
        else{
            el.classList.add('display-none')
        }
    })
}

export const reverseOrder = ()=>{
    let $container = d.querySelector('.posts-container')
    let $fragment = d.createDocumentFragment()
    let $posts = $container.childNodes
    $posts.forEach((el, i)=>{
        $fragment.insertBefore(el, $container.childNodes)
    })
    $container.innerHTML = ''
    $container.appendChild($fragment)
}

export const renderPostsByOlder = ()=>{
    $main.innerHTML = ''
    inmutableState.posts.forEach((post)=>{
        appendPost(post)
    }) 
}


export const renderPostsByRecent = ()=>{
    $main.innerHTML = ''
    for(let i = inmutableState.posts.length-1; i>=0; i--){
        appendPost(inmutableState.posts[i])
    }
}

const renderState = ()=>{
    let order = getItem('order')
    if(order === 'Recent'){
        renderPostsByRecent()
    }
    else if(order === 'Older'){
        renderPostsByOlder()
    }
    categoryFilter() 
    searchFilter()
}


export const setState = (newValue = null)=>{
    if(newValue){
        for(let prop in inmutableState){
            if(newValue[prop]){
                inmutableState[prop] = newValue[prop]
            }
        }
    }
    renderState()
}

export let state = JSON.parse(JSON.stringify(inmutableState))
