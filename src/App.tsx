
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import Home from './pages/Home';

import Destinations from './pages/Destinations';
import Bookings from './pages/Bookings';
import SignupPage from './pages/signup';
import './App.css';
import BookDestination from './pages/BookDestination';
import Explore from './pages/Explore';

const ProtectedRoute = ({ children, isAuthenticated }: { children: React.ReactNode; isAuthenticated: boolean }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};


const PublicRoute = ({ children, isAuthenticated }: { children: React.ReactNode; isAuthenticated: boolean }) => {
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  // simple loader
  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center" style={{ backgroundImage: "url('/paris.jpg')" }}> 
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/auth" 
            element={
              <PublicRoute isAuthenticated={!!user}>
                <SignupPage />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/destinations" 
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <Destinations />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bookings" 
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <Bookings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bookingdetails" 
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <BookDestination />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/explore/:id" 
            element={
              <ProtectedRoute isAuthenticated={!!user}>
                <Explore />
              </ProtectedRoute>
            } 
          />
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
