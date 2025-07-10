import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Files from './components/Files';
import SharedFile from './components/SharedFile';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';
import AdminPanel from './components/AdminPanel';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shared/:uuid" element={<SharedFile />} />

        {/* Защищённые маршруты */}
        <Route path="/" element={
          <PrivateRoute>
            <Files />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;