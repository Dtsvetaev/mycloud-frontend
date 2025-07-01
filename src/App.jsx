import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Files from './components/Files';
import SharedFile from './components/SharedFile';

function Navigation() {
  const isAuth = !!localStorage.getItem('access');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Files</Link>
      {isAuth ? (
        <button onClick={handleLogout} style={{ marginLeft: '1em' }}>Выход</button>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: '1em' }}>Login</Link>
          <Link to="/register" style={{ marginLeft: '1em' }}>Register</Link>
        </>
      )}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Files />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shared/:uuid" element={<SharedFile />} />
      </Routes>
    </Router>
  );
}

export default App;




