import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:8000/api/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    const response = await axios.post('http://localhost:8000/api/todos', { title: newTodo });
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
      <div className="App">
        <h1>TODO List</h1>
          <div className="d-flex">
            <ul className="m-auto">
              {todos.map(todo => (
                  <li key={todo.id}>
                    {todo.title}
                    <button onClick={() => deleteTodo(todo.id)} className="ml-1">Delete</button>
                  </li>
              ))}
            </ul>
          </div>
        <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="New TODO"
        />
        <button onClick={addTodo}>Add TODO</button>
      </div>
  );
};

export default App;