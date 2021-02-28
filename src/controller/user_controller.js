const UserSchema = require('../models/User.js')

const getUserByName = async(username) =>{
    const user = await UserSchema.findOne({username})
    return user
}

const saveUser = async(username, password) =>{
    const newUser = new UserSchema({
        username,
        password
    })
    const user = await newUser.save()
    return user
}

const updateUser = async (id, newUser)=>{
    const user = await UserSchema.updateOne(
        {_id: id},
        {
            $set: newUser
        })
    return user
}

const eraseUser = async (id)=>{
    const user = await UserSchema.deleteOne({_id: id})
    return user
}

module.exports = {
    getUserByName,
    saveUser,
    updateUser,
    eraseUser
}