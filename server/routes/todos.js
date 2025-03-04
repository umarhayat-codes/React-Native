const express = require("express");
const Todos = require("../models/todo");
const route = express.Router();

// Get all todos for a user
route.get('/get/:user_id', async (req, res) => {
    const { user_id } = req.params;
    console.log('user_id :>> ', user_id);
    try {
        const todos = await Todos.find({ user_id });
        console.log('todos :>> ', todos);
        res.status(200).json({ todos });
    } catch (err) {
        console.error('Error fetching todos:>> ', err);
        res.status(500).json({ message: "Failed to fetch todos", error: err.message });
    }
});

// Create a new todo
route.post('/create', async (req, res) => {
    const todoData = req.body;
    console.log('todoData :>> ', todoData);
    try {
        const todo = new Todos(todoData);
        await todo.save();
        res.status(201).json({ message: "A new todo has been successfully created", todo });
    } catch (err) {
        console.error('Error creating todo:>> ', err);
        res.status(500).json({ message: "Failed to create todo", error: err.message });
    }
});

route.get('/get-single/:id', async (req, res) => {
    const { id } = req.params;
    console.log('id :>> ', id);
    try {
        const todo = await Todos.findById(id); // Use findById for MongoDB `_id`
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        console.log('todo :>> ', todo);
        res.status(200).json({ todo });
    } catch (err) {
        console.error('Error fetching todo:>> ', err);
        res.status(500).json({ message: "Failed to fetch todo", error: err.message });
    }
});

// Update a todo
route.patch('/update/:id', async (req, res) => {
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
route.delete('/delete/:id', async (req, res) => {
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

module.exports = route;




// const express = require("express")
// const Todos = require("../models/todo")
// const route = express.Router()

// route.get('/get/:user_id', async (req,res) => {
//     const {user_id} = req.params
//     console.log('user_id :>> ', user_id);
//     try {
//         const todos = await Todos.find({user_id})
//         console.log('todos :>> ', todos);
//         res.status(200).json({todos})
//     }
//     catch (err) {
//         console.error('err :>> ', err);
//         res.status(500).json({err})        
//     } 
// })

// route.post('/create', async (req,res) => {
//     const todoData = req.body
//     console.log('todoData :>> ', todoData);
//     try {
        
//         const todo = new Todos(todoData) 
//         await todo.save()
//         res.status(201).json({message : "A new tode has successfully created",todo})
//     }
//     catch (err) {
//         res.status(500).json({err})
//     }
// })


// route.get('/get-single/:id', async (req,res) => {
//     const {id} = req.params
//     console.log('id :>> ', id);
//     try {
//         const todo = await Todos.findOne({id})
//         console.log('todos :>> ', todo);
//         res.status(200).json({todo})
//     }
//     catch (err) {
//         console.error('err :>> ', err);
//         res.status(500).json({err})        
//     } 
// })

// // console.log('id :>> ', id)
// route.patch('/update/:id', async(req,res) => {
//     const updatedTodo = req.body
//     const {id} = req.params
//     console.log('updatedTodo :>> ', updatedTodo);
//     console.log('id :>> ', id);
//     try {
//         const todo = await Todos.updateOne({id},updatedTodo)
//         console.log('todo :>> ', todo);
//         res.status(201).json({message : "A tode has successfully updated",todo})
//     } 
//     catch (err) {
//         console.log('err :>> ', err);
//     }
    
// }) 


// module.exports = route