const express = require('express')
const bodyParser = require('body-parser') 

const cors = require('cors') 

const Todos = require("./models/todo");

 
require('dotenv').config()
const {Config} = require('./config/Config')

console.log('Config :>> ', Config);
Config()

const app = express()


app.use(cors())
app.use(bodyParser.json())
const auth = require('./routes/auth')

app.get("/",(req,res)=>("hello"))
app.use("/auth", auth);
// Get all todos for a user
app.get('/api',(req,res) => {
    res.send("Hello World")
})
console.log('first')
app.get('/get/:user_id', async (req, res) => {
    const { user_id } = req.params;
    console.log('user_id :>> ', user_id);
    console.log('res', res)
    console.log('req', req)
    try {
        const todos = await Todos.find({ createBy: user_id});
        console.log('todos :>> ', todos);
        res.status(200).json({ todos });
    } catch (err) {
        console.error('Error fetching todos:>> ', err);
        res.status(500).json({ message: "Failed to fetch todos", error: err.message });
    }
});

// Create a new todo
app.post('/create', async (req, res) => {
    const todoData = req.body;
    console.log('todoData :>> ', todoData);
    console.log('req.body', req.body)
    try {
        const todo = new Todos(todoData);
        await todo.save();
        res.status(201).json({ message: "A new todo has been successfully created", todo });
    } catch (err) {
        console.error('Error creating todo:>> ', err);
        res.status(500).json({ message: "Failed to create todo", error: err.message });
    }
});

// Get a single todo by its ID
app.get('/todo', async (req, res) => {
    
    try {
        const todo = await Todos.find() // Use findById for MongoDB `_id`
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "A new todo has been successfully get", todo });
        console.log('todo :>> ', todo);
        // res.status(200).json({ todo });
    } catch (err) {
        console.error('Error fetching todo:>> ', err);
        res.status(500).json({ message: "Failed to fetch todo", error: err.message });
    }
});

// Update a todo
app.patch('/update/:id', async (req, res) => {
    const updatedTodo = req.body;
    const { id } = req.params;
    console.log('updatedTodo :>> ', updatedTodo);
    console.log('id :>> ', id);
    try {
        const todo = await Todos.findByIdAndUpdate(id, updatedTodo, { new: true });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        console.log('Updated todo :>> ', todo);
        res.status(200).json({ message: "Todo successfully updated", todo });
    } catch (err) {
        console.error('Error updating todo:>> ', err);
        res.status(500).json({ message: "Failed to update todo", error: err.message });
    }
});

// Delete a todo
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log('id :>> ', id);
    try {
        const todo = await Todos.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        console.log('Deleted todo :>> ', todo);
        res.status(200).json({ message: "Todo successfully deleted", todo });
    } catch (err) {
        console.error('Error deleting todo:>> ', err);
        res.status(500).json({ message: "Failed to delete todo", error: err.message });
    }
});





const PORT = 8001



app.listen(PORT,() => {
    console.log('Server is runing on the Port :>> ', PORT);
})


