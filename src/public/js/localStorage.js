export const BlogStorageInit=()=>{
    if(!localStorage.getItem("URBLOG")){
        localStorage.setItem("URBLOG", "{}")
    }
}

const getData = ()=>{
    BlogStorageInit()
    return JSON.parse(localStorage.getItem("URBLOG"))
}

const setData = (value)=>{
    localStorage.setItem('URBLOG', JSON.stringify(value))
}

export const getItem = (prop = null)=>{
    if(!prop) return ''
    let json = getData()
    return json[prop]
}

export const deleteItem = (prop = null)=>{
    if(!prop) return ''
    let json = getData()
    if(!json[prop]) return ''
    delete json[prop]
    setData(json)
}

export const setItem = (prop = null, value = null)=>{
    if(!prop || !value) return ''
    let json = getData()
    json[prop] = value
    setData(json)
}