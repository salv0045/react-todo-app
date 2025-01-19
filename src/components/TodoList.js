import React from 'react';
import Todoitem from './Todoitem';
import '../styles/TodoList.css'; // Ensure this path is correct

const TodoList = ({ todos }) => (
  <ul>
    {todos.map((todo) => (
      <Todoitem key={todo.id} todo={todo} />
    ))}
  </ul>
);

export default TodoList;
