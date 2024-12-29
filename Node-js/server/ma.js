const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require('./models/auth');
const verifyToken = require('./middlewares/auth'); // Ensure this is correctly defined

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://umarhayatcoder:vXtDrwIIh0BVfW0e@cluster0.5gks7.mongodb.net/', {
    dbName: 'codev'
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
    console.error('MongoDB connection error:', err);
});

app.post('/register', async (req, res) => {
    console.log('req :>> ', req.body);
    const { uid, email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (user) { return res.status(404).json({ message: "User  already exists" }); }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = await new Users({ uid, email, password: hashedPassword });
        await userData.save();
        res.status(201).json({ message: "User  registered successfully", userData });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.error('err :>> ', err);
    }
});

app.post('/login', async (req, res) => {
    console.log('req :>> ', req.body);
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) { return res.status(404).json({ message: "User  does not exist" }); }
        const match = await bcrypt.compare(password, user.password); // Ensure this is awaited
        if (match) {
            const { uid } = user;
            const token = jwt.sign({ uid }, "scret-key", { expiresIn: "1h" });
            res.status(200).json({ message: "User  logged in successfully", token });
        } else {
            res.status(404).json({ message: "Password is not correct" });
        }
    } catch (err) {
        res.status(500).json({ message: "Something went wrong while logging in" });
        console.log('err :>> ', err);
    }
});


app.get("/user", verifyToken, async (req, res) => {
    const uid = req.body
    console.log('req :>> ', req.uid);

    try {

        const user = await Users.findOne({ uid })
        if (!user) { return res.status(404).json({ message: "User not found" }) }

        res.status(200).json({ user })


    } catch (error) {
        console.error(error)
        res.status(500).json({ error })
    }
})


       





















// const express = require('express')
// const app = express()

// app.use(express.json())
// app.use(cors())


// app.get('/todo/get',(req,res) => {
//     try {
//         const todos = []
//         res.status(200).json({todos})
//     }
//     catch(err) {
//         console.error("Error",err)
//         res.status(500).json({message : "Error"})
//     } 
// })

// app.post('/todo/create',(req,res) => {
//     const todoData = req.body
//     try {
//         const todos = []
//         todos.push(todoData)
//         res.status(201).json({message : "create todo",todos})
//     }
//     catch (err) {
//         console.error('error :>> ', err);
//         res.status(500,json({message : "Error"}))
//     }
// })
// app.patch('/todo/update:id',(req,res) => {
//     const todoData = req.body
//     const id = req.params
//     try {
//         const todos = []
//         todos.push(todoData)
//         res.status(201).json({message : "create todo",todos})
//     }
//     catch (err) {
//         console.error('error :>> ', err);
//         res.status(500,json({message : "Error"}))
//     }
// })


const PORT = 8000
// // const PORT = 8000 || env.process
// const {PORT = 8000} = env.process 

app.listen(PORT,(req,res) => {
    console.log('Server is Runing on PORT:>> ',PORT);
})