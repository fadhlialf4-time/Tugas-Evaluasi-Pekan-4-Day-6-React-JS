import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { Navbar } from './components/Navbar';
import { PrivateRoute } from './components/PrivateRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import './App.css';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ProductProvider>
          <Router>
            <div className="app">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Navigate to="/products" replace />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute requireAdmin>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/products" replace />} />
                </Routes>
              </main>
              <footer className="footer">
                <p>© 2025 E-Commerce Lite. All rights reserved.</p>
              </footer>
            </div>
          </Router>
        </ProductProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;