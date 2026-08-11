import { useState } from 'react';
import LoginPage from '../features/auth/LoginPage';
import HomePage from '../features/home/HomePage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return <HomePage />;
}