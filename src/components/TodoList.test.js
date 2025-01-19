import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  test('renders a list of todo items', () => {
    const todos = [
      { id: 1, todo: 'Test Todo 1' },
      { id: 2, todo: 'Test Todo 2' },
      { id: 3, todo: 'Test Todo 3' },
    ];

    // Render the TodoList with the provided todos
    render(<TodoList todos={todos} />);

    // Assert that all todos are rendered
    todos.forEach((todo) => {
      const todoElement = screen.getByText(new RegExp(todo.todo, 'i'));
      expect(todoElement).toBeInTheDocument();
    });

    // Assert that the correct number of items are rendered
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(todos.length);
  });

  test('renders an empty list when no todos are provided', () => {
    render(<TodoList todos={[]} />);

    // Assert that no list items are rendered
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });
});
