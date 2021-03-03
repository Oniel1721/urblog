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
    $textArea.classList.add('hide')
    $textArea.value = ''
    $cancelBtn.classList.add('hide')

    setTimeout(()=>{
        $cancelBtn.classList.add('height-0')
        $textArea.classList.add('height-0')
    }, 500)
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
            d.querySelectorAll('.hide')
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

export const showHideComments = (target = null)=>{
    if(!target) return 0
    let $h4 = d.querySelector('.comments-container h4')
    let $commentsContainer = d.querySelector('.comments-container')
    if(target === $h4){
        if(d.querySelector('.comment')){
            //Erase comments from UI
            $commentsContainer.innerHTML = $h4.outerHTML
        }
        else{
            // Show comments

        }
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