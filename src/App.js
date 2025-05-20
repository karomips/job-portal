import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import Postpage from './components/Postpage/Postpage';
import Contact from './components/Contact/Contact';
import Upload from './components/Upload/Upload';
import Register from './components/Register/Register';
import Jobspage from './components/Jobspage/Jobspage';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './components/Landing/Landing';

function AppLayout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/upload';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/landing" element={<Landing />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobspage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <Postpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
        {/* Add other routes here */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
