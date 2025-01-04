const mongoose = require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.MONGOOSE_URI)

const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    firstName : String,
    lastName : String,
})

const acccountSchema = new mongoose.Schema({
    userId : String,
    username : String,
    balance : Number
})

const UserData = mongoose.model('UserData',userSchema)
const AccountData = mongoose.model('AccountData',acccountSchema)
module.exports = {
    UserData,
    AccountData
}