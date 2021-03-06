const d = document,
$main = d.querySelector('main')

export const appendPost = ({owner, _id, title, content, topic, creationDate})=>{
    let $post = d.createElement('div')
    $post.classList.add('post')
    $post.classList.add('gray-bg')
    $post.classList.add('post-vw')
    $post.setAttribute('id', _id)

    $post.innerHTML = `
            <h3 class="post-title white-c bold">${title}</h3>
            <h4 class="post-topic white-c bold">${topic}</h4>
            <p class="post-content gray-c">${content}</p>
            <div class="post-info">
                <p class="post-date white-c">${creationDate}</p>
                <p class="post-owner blue-c bold">${owner}</p>
            </div>
            <p class="post-show-more bold white-c">show more</p>
            <div class="full-post transition">
                <div class="comment-form transition">
                    <textarea maxlength="255" class="transition hide height-0" cols="30" rows="10" placeholder="Type a comment..."></textarea>
                    <button class="comment-btn btn white-bg black-c bold">Comment</button>
                    <button class="cancel-btn red-bg btn transition hide height-0">Cancel</button>
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
    $main.appendChild($post)
}

export const renderPosts = (posts)=>{
    $main.innerHTML = ''
    posts.forEach((post)=>{
        appendPost(post)
    })
}
