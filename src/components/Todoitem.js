import React from 'react';
import '../styles/Todoitem.css';

const Todoitem = ({ todo }) => (
  <li className="todo-item">{todo.todo}</li>
);

export default Todoitem;
