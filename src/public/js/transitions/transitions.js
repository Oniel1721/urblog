const d = document

export const mostFilterBtn = (target = null)=>{
    if(!target) return 0
    if(target.parentNode.classList.contains('most-filter')){
        d.querySelectorAll('.most-filter .btn')
        .forEach((filter)=>{
            if(filter === target){
                target.classList.add('white-btn')
                target.classList.remove('black-btn')
                // Change order
            }
            else{
                filter.classList.add('black-btn')
                filter.classList.remove('white-btn')
            }
        })
    }
}

const hideForm = ()=>{
    let $textArea = d.querySelector('.comment-form textarea'),
    $cancelBtn = d.querySelector('.comment-form .cancel-btn')
    $textArea.classList.add('height-0')
    $textArea.value = ''
    $cancelBtn.classList.add('height-0')
    $cancelBtn.classList.add('hide')
    $textArea.classList.add('hide')
}

const textAreaFocus = ()=>{
    let $textArea = d.querySelector('.comment-form textarea')
    let i = 0
    let interval = setInterval(()=>{
        $textArea.classList.toggle('cancel-btn')
        if(i>5){
            $textArea.classList.remove('cancel-btn')
            clearInterval(interval)
        }
        i++
    }, 125)
}

export const commentBtn = (target = null)=>{
    if(!target) return 0
    if(target.classList.contains('comment-btn')){
        if(d.querySelector('.comment-form .hide')){
            d.querySelectorAll('.comment-form .hide')
            .forEach((el)=>{
                el.classList.remove('hide')
                el.classList.remove('height-0')
            })
        }
        else if(d.querySelector('.comment-form textarea').value){
            hideForm()
        }
        else{
            textAreaFocus()
        }
    }
}

export const cancelComment = (target = null)=>{
    if(!target) return 0
    if(target === d.querySelector('.comment-form .cancel-btn')){
        hideForm()
    }
}

export const activeMenu = (target = null)=>{
    if(!target) return 0
    let $switch = d.querySelector('.menu-switch')
    let $menuOptions = d.querySelectorAll('.menu-option')
    if(target === $switch || target.parentNode === $switch){
        for(let i = 0; i<$menuOptions.length; i++){
            if(i === $menuOptions.length-1){
                $switch.classList.toggle('rotate')
            }
            else{
                let className = `opt-${4-i}`
                $menuOptions[i].classList.toggle(className)
            }
        }
    }
}

export const fullPost = (target)=>{
    if(!target) return 0
    let $showMore = d.querySelector('.post-show-more')
    let $fullPost = d.querySelector('.full-post')
    if(target === $showMore){
        if($fullPost.classList.contains('show')){
            $showMore.textContent = 'show more'
            $fullPost.classList.remove('show')
        }
        else{
            $showMore.textContent = 'show less'
            $fullPost.classList.add('show')
        }
    }
}

export const fadeScreenHide = ($fadeScreen)=>{
    $fadeScreen.classList.remove('in')
    $fadeScreen.classList.remove('up')
}

export const loginBtn = (target)=>{
    if(!target) return 0
    let $loginBtn= d.getElementById('login-btn')
    let $fadeScreen = d.querySelector('.fade-screen')
    let $span = d.querySelector('#signup-form span')
    if(target === $loginBtn || target === $span){
        $fadeScreen.classList.remove('up')
        $fadeScreen.classList.add('in')
    }
    else if(target === $fadeScreen){
        fadeScreenHide($fadeScreen)
    }
}

export const signupBtn = (target)=>{
    if(!target) return 0
    let $signupBtn= d.getElementById('signup-btn')
    let $fadeScreen = d.querySelector('.fade-screen')
    let $span = d.querySelector('#login-form span')
    if(target === $signupBtn || target === $span){
        $fadeScreen.classList.remove('in')
        $fadeScreen.classList.add('up')
    }
    else if(target === $fadeScreen){
        fadeScreenHide($fadeScreen)
    }
}

export const alertMsg = (msg = '', green = false)=>{
    let $alertMsg = d.querySelector('.alert-msg')
    $alertMsg.classList.add('show')
    $alertMsg.firstChild.textContent = msg.toUpperCase()
    if(green){
        $alertMsg.classList.add('green-alert')
    }
    else{
        $alertMsg.classList.remove('green-alert')
    }
    setTimeout(()=>{
        $alertMsg.classList.remove('show')
    }, 2000)
}