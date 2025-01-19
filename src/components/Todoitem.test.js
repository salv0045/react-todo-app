import React from 'react';
import { render, screen } from '@testing-library/react';
import Todoitem from './Todoitem';

describe('Todoitem Component', () => {
  test('renders a single todo item with correct text', () => {
    const todo = { id: 1, todo: 'Test Todo' };

    // Render the component with the provided `todo` prop
    render(<Todoitem todo={todo} />);

    // Assert that the todo text is rendered correctly
    const todoElement = screen.getByText(/Test Todo/i);
    expect(todoElement).toBeInTheDocument();

    // Assert that the rendered element has the correct class
    expect(todoElement).toHaveClass('todo-item');
  });
});
