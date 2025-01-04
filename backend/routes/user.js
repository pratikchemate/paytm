const express = require('express');
const { signupSchema, signinSchema, updateUserSchema } = require('../types');
const { default: mongoose } = require('mongoose');
const { UserData, AccountData } = require('../db');
const userRouter = express()
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET
const { authMiddleware } = require('../middleware');


function randomBalance(){
    return 500 + Math.random()*10000
}
userRouter.put('/' , authMiddleware , async (req,res)=>{
    const parser = updateUserSchema.safeParse(req.body)

    if(!parser.success){
        res.status(400).json({status: "error" , message: "wrong inputs"})
    }else{
        await UserData.updateOne(req.body , {_id : req._id})
        res.json({
            status : "sucess", message: "Updated successfully"
        })
    }
})
userRouter.post('/signup', async (req,res)=>{
    const body = req.body;
    const parser = signupSchema.safeParse(body)

    if(!parser.success){
        return res.status(400).json({status: "error" , message: "wrong inputs"})
    }else{
        const user = await UserData.findOne({username : body.username})
        // console.log(user)
        if(user){
            return res.json({status : "error" , message : "User Already Exists"})
        }
        const initialAmount = randomBalance()
        let dbUser = ""
        await UserData.create(body).then(async(a)=>{ 
            console.log(a)
            dbUser = a
            await AccountData.create({userId : a._id , username : a.username, balance : initialAmount})
        })
        const token  = jwt.sign({userId : dbUser._id}, JWT_SECRET)
        return res.json({status : "sucess" , message : "User created successfully" , token : token}) 
    }
})

userRouter.post('/signin', async (req,res)=>{
    const body = req.body;
    const parser = signinSchema.safeParse(body)

    if(!parser.success){
        return res.json({status: "error" , message: "Wrong Inputs"})
    }else{
        const dbUser = await UserData.findOne(body)
        console.log(dbUser)
        if(!dbUser || !dbUser._id){
           return res.json({status : "error" , message : "Wrong Username/password"})
        }
        const token  = jwt.sign({userId : dbUser._id}, JWT_SECRET)
        return res.json({status : "success" , message : "Login success" , token : token , firstName : dbUser.firstName}) 

    }
})

userRouter.get('/users', async (req,res)=>{
    const filter  = req.query.filter || "";
    const users = await UserData.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    }).limit(5)

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })



})
module.exports = {
    userRouter
}