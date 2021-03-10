import {setItem, getItem} from './localStorage.js'

const d = document,
$main = d.querySelector('main')

const inmutableState = {
    posts:[],
    comments: []
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

export const appendComment = ({postId, owner, content = '', _id, creationDate})=>{
    let $commentsContainer = d.querySelector(`#p-${postId} .comments-container`)
    let $comment = d.createElement('div')
    let $commentInfo = d.createElement('div')
    let $owner = d.createElement('p')
    let $date = d.createElement('p')
    let $content = d.createElement('p')

    $comment.setAttribute('class', 'comment')
    $commentInfo.setAttribute('class', 'comment-info')
    $owner.setAttribute('class', 'comment-owner blue-c bold')
    $date.setAttribute('class', 'comment-date gray-c')
    $content.setAttribute('class', 'comment-content gray-c')

    $owner.textContent = owner
    $date.textContent = creationDate
    $content.textContent = content

    $commentInfo.appendChild($owner)
    $commentInfo.appendChild($date)
    $comment.appendChild($commentInfo)
    $comment.appendChild($content)
    $commentsContainer.appendChild($comment)
    /*
    `
    <div class="comment">
            <div class="comment-info">
                <p class="comment-owner blue-c bold">Brock123</p>
                <p class="comment-date gray-c">10/10/2021</p>
            </div>
            <p class="comment-content gray-c">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita sed culpa omnis saepe nobis porro laudantium corporis sequi consequatur amet nihil odit assumenda provident eligendi temporibus, impedit eaque. Possimus, doloribus?
            </p>
    </div>
    
    `*/
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
    let $commentForm = d.createElement('form')
    let $commentsContainer = d.createElement('div')
    
    $post.setAttribute('id', `p-${_id}`)
    $post.setAttribute('class', 'post gray-bg post-vw')
    $title.setAttribute('class', 'post-title white-c bold')
    $topic.setAttribute('class', 'post-topic white-c bold')
    $content.setAttribute('class', 'post-content gray-c')
    $postInfo.setAttribute('class', 'post-info')
    $date.setAttribute('class', 'post-date white-c')
    $owner.setAttribute('class', 'post-owner blue-c bold')
    $showMore.setAttribute('class', 'post-show-more bold white-c')
    $fullPost.setAttribute('class', 'full-post transition')
    $commentForm.setAttribute('class', 'comment-form transition')
    $commentsContainer.setAttribute('class', 'comments-container')

    $title.textContent = title
    $topic.textContent = topic
    $content.textContent = content.length>=255?`${content.slice(0,255)}...`:content
    // $date.textContent = formateDate(creationDate)
    $date.textContent = creationDate
    $owner.textContent = owner
    $showMore.textContent = 'show more'
    $commentForm.innerHTML = `
    <textarea required name="content" class="transition hide height-0" cols="30" rows="10" placeholder="Type a comment..."></textarea>
    <button type="submit" class="comment-btn btn white-bg black-c bold">Comment</button>
    <button class="cancel-btn btn transition hide height-0">Cancel</button>
    `

    $post.appendChild($title)
    $post.appendChild($topic)
    $post.appendChild($content)
    $postInfo.appendChild($date)
    $postInfo.appendChild($owner)
    $post.appendChild($postInfo)
    $post.appendChild($showMore)
    $fullPost.appendChild($commentForm)
    $fullPost.appendChild($commentsContainer)
    $post.appendChild($fullPost)
    $main.appendChild($post)
}


export const renderCommentsOfPost = (postId)=>{
    let $commentsContainer = d.querySelector(`#p-${postId} .comments-container`)
    let numberOfComment = 0,
    s = ''
    $commentsContainer.innerHTML = ''
    inmutableState.comments.forEach(comment=>{
        if(postId.includes(comment.postId)){
            appendComment(comment)
            numberOfComment++
        }
    })
    if(numberOfComment >=1){
        if(numberOfComment !== 1){
            s = 's'
        }
        $commentsContainer.innerHTML = `<h4 class="white-c bold">${numberOfComment} Comment${s}</h4>` + $commentsContainer.innerHTML
    }

}

export const showMorePost = (id = null, more = false)=>{
    let $post = d.getElementById(id)
    let $content = $post.querySelector('.post-content')
    if(more){
        inmutableState.posts.forEach(el=>{
            if(id.includes(el._id)){
                $content.textContent = el.content
                renderCommentsOfPost(el._id)
            }
        })
    }
    else{
        $content.textContent = $content.textContent.length>=255?`${$content.textContent.slice(0,255)}...`:$content.textContent
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

let fullpost = `
<div class="full-post transition">
    <div class="comment-form transition">
        <textarea name="content" class="transition hide height-0" cols="30" rows="10" placeholder="Type a comment..."></textarea>
        <button class="comment-btn btn white-bg black-c bold">Comment</button>
        <button class="cancel-btn btn transition hide height-0">Cancel</button>
    </div>
    <div class="comments-container">
        <h4 class="white-c bold">2 Comments</h4>
        <div class="comment">
            <div class="comment-info">
                <p class="comment-owner blue-c bold">Brock123</p>
                <p class="comment-date gray-c">10/10/2021</p>
            </div>
            <p class="comment-content gray-c">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita sed culpa omnis saepe nobis porro laudantium corporis sequi consequatur amet nihil odit assumenda provident eligendi temporibus, impedit eaque. Possimus, doloribus?
            </p>
        </div>
        <div class="comment">
            <div class="comment-info">
                <p class="comment-owner blue-c bold">Brock123</p>
                <p class="comment-date gray-c">10/10/2021</p>
            </div>
            <p class="comment-content gray-c">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita sed culpa omnis saepe nobis porro laudantium corporis sequi consequatur amet nihil odit assumenda provident eligendi temporibus, impedit eaque. Possimus, doloribus?
            </p>
        </div>
    </div>
</div>
`
