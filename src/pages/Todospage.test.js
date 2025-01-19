import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import TodosPage from './TodosPage';
import { fetchTodos } from '../api/todos';

jest.mock('../api/todos', () => ({
  fetchTodos: jest.fn(),
}));

describe('TodosPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders title and initial state', () => {
    render(<TodosPage />);
    const titleElement = screen.getByText(/your todos/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('displays todos after fetching', async () => {
    const mockTodos = {
      todos: [
        { id: 1, todo: 'Todo 1' },
        { id: 2, todo: 'Todo 2' },
      ],
      total: 20,
    };
    fetchTodos.mockResolvedValueOnce(mockTodos);

    await act(async () => {
      render(<TodosPage />);
    });

    // Check if the fetched todos are rendered
    const todo1 = screen.getByText(/todo 1/i);
    const todo2 = screen.getByText(/todo 2/i);

    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeInTheDocument();
  });

  test('shows error message on fetch failure', async () => {
    fetchTodos.mockRejectedValueOnce(new Error('Fetch error'));

    await act(async () => {
      render(<TodosPage />);
    });

    const errorMessage = await screen.findByText(/failed to fetch todos/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('handles pagination correctly', async () => {
    const mockTodosPage1 = {
      todos: [{ id: 1, todo: 'Page 1 Todo' }],
      total: 20,
    };
    const mockTodosPage2 = {
      todos: [{ id: 2, todo: 'Page 2 Todo' }],
      total: 20,
    };

    fetchTodos.mockResolvedValueOnce(mockTodosPage1).mockResolvedValueOnce(mockTodosPage2);

    await act(async () => {
      render(<TodosPage />);
    });

    // Verify page 1 todos are rendered
    expect(screen.getByText(/page 1 todo/i)).toBeInTheDocument();

    // Simulate clicking the next button
    const nextButton = screen.getByRole('button', { name: /next/i });
    act(() => {
      nextButton.click();
    });

    // Wait for page 2 todos to load
    await waitFor(() => expect(screen.getByText(/page 2 todo/i)).toBeInTheDocument());
  });
});
