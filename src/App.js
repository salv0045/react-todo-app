import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodosPage from './pages/TodosPage';
import { logout } from './api/auth';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        {/* Display Logout Button Only When Authenticated */}
        {isAuthenticated && (
          <header style={{ padding: '10px', backgroundColor: '#f0f0f0', textAlign: 'right' }}>
            <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>
              Logout
            </button>
          </header>
        )}
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage onLogin={() => setIsAuthenticated(true)} />
              ) : (
                <Navigate to="/todos" />
              )
            }
          />
          <Route
            path="/todos"
            element={isAuthenticated ? <TodosPage /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/todos" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
