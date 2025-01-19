import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import Pagination from '../components/Pagination';
import { fetchTodos } from '../api/todos';
import '../styles/TodosPage.css';



const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos(currentPage, 10); // Fetch 10 todos per page
        console.log('Fetched todos:', data); // Debug log
        setTodos(data.todos || []); // Safeguard for undefined data
        setTotalPages(Math.ceil(data.total / 10));
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Failed to fetch todos. Please try again.');
      }
    };

    loadTodos();
  }, [currentPage]);

  return (
    <div className="todos-container">
      <h1>Your Todos</h1>
      {error && <p className="error-message">{error}</p>}
      <TodoList todos={todos} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TodosPage;
