const express = require('express');
const router = express.Router();
const { 
  getAllTodos, 
  getTodoById, 
  createTodo, 
  updateTodo, 
  deleteTodo 
} = require('../controllers/todoController');

// GET all todos
router.get('/', getAllTodos);

// GET a specific todo by ID
router.get('/:id', getTodoById);

// POST create a new todo
router.post('/', createTodo);

// PATCH update a todo
router.patch('/:id', updateTodo);

// DELETE a todo
router.delete('/:id', deleteTodo);

module.exports = router;
