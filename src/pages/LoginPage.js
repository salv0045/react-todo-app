import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { login } from '../api/auth';
import '../styles/LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [error, setError] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      console.log('Username and password entered by the user:', { username, password });
      const authData = await login(username, password);
      console.log('Login successful:', authData);
      onLogin(authData);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <div className="login-form">
        <LoginForm onSubmit={handleLogin} />
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
