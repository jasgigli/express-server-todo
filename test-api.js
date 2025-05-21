const fetch = require('node-fetch');

async function testApi() {
  try {
    // Test GET /todos
    console.log('Testing GET /todos');
    const getTodosResponse = await fetch('http://localhost:3000/todos');
    const todos = await getTodosResponse.json();
    console.log('GET /todos response:', todos);

    // Test POST /todos
    console.log('\nTesting POST /todos');
    const createTodoResponse = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Todo',
        description: 'Created via test script',
      }),
    });
    const newTodo = await createTodoResponse.json();
    console.log('POST /todos response:', newTodo);

    // Test PATCH /todos/:id
    console.log('\nTesting PATCH /todos/:id');
    const updateTodoResponse = await fetch(`http://localhost:3000/todos/${newTodo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: true,
      }),
    });
    const updatedTodo = await updateTodoResponse.json();
    console.log('PATCH /todos/:id response:', updatedTodo);

    // Test DELETE /todos/:id
    console.log('\nTesting DELETE /todos/:id');
    const deleteTodoResponse = await fetch(`http://localhost:3000/todos/${newTodo.id}`, {
      method: 'DELETE',
    });
    const deleteResult = await deleteTodoResponse.json();
    console.log('DELETE /todos/:id response:', deleteResult);

    // Verify deletion
    console.log('\nVerifying deletion with GET /todos');
    const verifyResponse = await fetch('http://localhost:3000/todos');
    const todosAfterDelete = await verifyResponse.json();
    console.log('GET /todos response after deletion:', todosAfterDelete);

  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testApi();
