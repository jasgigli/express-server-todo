// In-memory storage for todos
let todos = [
  {
    id: 1,
    title: 'Learn Express.js',
    description: 'Build a RESTful API with Express',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Deploy to Vercel',
    description: 'Deploy the Express API to Vercel as serverless functions',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Helper function to find a todo by ID
const findTodoById = (id) => {
  const todoId = parseInt(id, 10);
  return todos.find(todo => todo.id === todoId);
};

// Get all todos
exports.getAllTodos = (req, res) => {
  res.status(200).json(todos);
};

// Get a specific todo by ID
exports.getTodoById = (req, res) => {
  const todo = findTodoById(req.params.id);
  
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  res.status(200).json(todo);
};

// Create a new todo
exports.createTodo = (req, res) => {
  const { title, description = '', completed = false } = req.body;
  
  // Validate required fields
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  
  // Generate a new ID (in a real app, this would be handled by a database)
  const newId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  
  const now = new Date().toISOString();
  
  const newTodo = {
    id: newId,
    title,
    description,
    completed,
    createdAt: now,
    updatedAt: now
  };
  
  todos.push(newTodo);
  
  res.status(201).json(newTodo);
};

// Update a todo
exports.updateTodo = (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex(todo => todo.id === todoId);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  const { title, description, completed } = req.body;
  const updatedTodo = {
    ...todos[todoIndex],
    title: title !== undefined ? title : todos[todoIndex].title,
    description: description !== undefined ? description : todos[todoIndex].description,
    completed: completed !== undefined ? completed : todos[todoIndex].completed,
    updatedAt: new Date().toISOString()
  };
  
  todos[todoIndex] = updatedTodo;
  
  res.status(200).json(updatedTodo);
};

// Delete a todo
exports.deleteTodo = (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex(todo => todo.id === todoId);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  todos = todos.filter(todo => todo.id !== todoId);
  
  res.status(200).json({ message: 'Todo deleted successfully' });
};
