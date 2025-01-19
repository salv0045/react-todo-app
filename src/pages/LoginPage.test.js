import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';
import { login } from '../api/auth';

jest.mock('../api/auth', () => ({
  login: jest.fn(),
}));

describe('LoginPage Component', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form and title', () => {
    render(<LoginPage onLogin={mockOnLogin} />);

    // Assert that the title is rendered
    const titleElement = screen.getByText(/login/i);
    expect(titleElement).toBeInTheDocument();

    // Assert that the login form is rendered
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('displays error message on failed login', async () => {
    login.mockRejectedValueOnce(new Error('Invalid username or password'));

    render(<LoginPage onLogin={mockOnLogin} />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);

    // Wait for the error message to appear
    const errorMessage = await screen.findByText(/invalid username or password/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('calls onLogin with authData on successful login', async () => {
    const mockAuthData = { token: 'mockToken', user: { id: 1, name: 'Emily' } };
    login.mockResolvedValueOnce(mockAuthData);

    render(<LoginPage onLogin={mockOnLogin} />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'emilys' } });
    fireEvent.change(passwordInput, { target: { value: 'emilyspass' } });
    fireEvent.click(submitButton);

    // Wait for the onLogin callback to be called
    await screen.findByRole('button', { name: /login/i });
    expect(mockOnLogin).toHaveBeenCalledWith(mockAuthData);
  });
});
