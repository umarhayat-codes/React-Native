const express = require('express')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Users = require('../models/auth')
const verifyToken = require('../middlewares/auth')

const router = express.Router()
const getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)

router.post('/register',async (req,res) => {
    console.log('req :>> ', req.body);
    const {firstName,email,password} = req.body
    try {
        const userExit = await Users.findOne({email})
        if (userExit) {return res.status(404).json({message : "User already exit"})}
        const hashedPassword = await bcrypt.hash(password,10)
        const userData = {firstName,email,password : hashedPassword,user_id : getRandomId()}
        const user = await Users(userData)
        await user.save()
        res.status(201).json({message : "User register successfully",userData})
    }catch (err) {
        res.status(500).json({message : "Something went to wrong"})
        console.error('err :>> ', err);
    }
})

router.post('/login',async (req,res) => {
    console.log('req :>> ', req.body);
    const {email,password} = req.body
    
    try {
        const user = await Users.findOne({email})
        console.log('user', user)
        if (!user) {return res.status(404).json({message : "User does not exit"})}
        const match = bcrypt.compare(password,user.password)
        if (match) {
            const {user_id} = user
            const token = jwt.sign({user_id},"scret-key",{expiresIn : "1h"})
            res.status(200).json({message : "User logged-In successfully",token})
        }else {
            res.status(404).json({message : "Password is not correct"})
        }
        
    }catch (err) {
        res.status(500).json({message : "Something went to wrong while login"})
        console.log('err :>> ', err);
    }
})

router.get("/user", verifyToken, async (req, res) => {
    const user_id = req.uid; // Use req.uid instead of req.user_id
    console.log('user_id', user_id)
    try {
        const user = await Users.findOne({ user_id }); // Ensure this matches your database schema
        if (!user) {
            return res.status(404).json({ message: "User  not found" });
        }
        console.log('user', user)
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});





module.exports = router 



// const express = require('express')
// // 
// const bcrypt = require("bcrypt")
// // 
// const jwt = require('jsonwebtoken')
// // 
// const Users = require('../models/auth')
// // 
// const route = express.Router()
// // 
// const getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
// // 
// route.post('/register',async(req,res) => {
//     const {firstName,email,password} = req.body
//     try {
//         const hashedPassword = bcrypt.hash(password,10)
//         const userData = {firstName,email,hashedPassword,user_id : getRandomId()}
//         const user = await Users(userData)
//         user.save()
//         res.status(201).json({message : "User successfully register",user})
//         // 
//     }
//     catch (err) {
//         console.log('err :>> ', err)
//         res.status(500).json({err})
//     }
// })
// // 
// // 
// route.post('/login',async(req,res) => {
//     const {email,password} = req.body
//     try {
//         const user = await Users.findOne({email})
//         if (!user) {return res.status(404).json({message : "User not found"})}
//         const match = bcrypt.compare(password,user.password)
//         if (match) {
//             const {user_id} = user
//             const token = jwt.sign({user_id},'scret-key',{expiresIn : '10m'})
//             res.status(201).json({message : "User loggedIn successfully",toke })
//         }else {
//             res.status(404).json({message : "User nto found"})
//         }
//     }
//     catch (err) {
//         console.log('err :>> ', err)
//         res.status(500).json({err})
//     }
// })
// // 
// // 
// router.get('/user',verifyToken,async(req,res) => {
//     const {email,password} = req.body
//     console.log('req.body', req.body)
//     try {
//         const user = await Users.findOne({email})
//         if (!user) {return res.status(404).json({message : "User not found"})}
//         const match = bcrypt.compare(password,user.password)
//         if (match) {
//             const {user_id} = user
//             const token = jwt.sign({user_id},'scret-key',{expiresIn : '10m'})
//             res.status(201).json({message : "User loggedIn successfully",toke })
//         }else {
//             res.status(404).json({message : "User nto found"})
//         }
//     }
//     catch (err) {
//         console.log('err :>> ', err)
//         res.status(500).json({err})
//     }
// })
// // 
// module.exports = route;