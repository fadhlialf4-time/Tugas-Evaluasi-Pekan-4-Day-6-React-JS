import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProductProvider } from './contexts/ProductContext'
import { Navbar } from './components/Navbar'
import { PrivateRoute } from './components/PrivateRoute'
import { Products } from './pages/Products'
import { ProductDetail } from './pages/ProductDetail'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'

const App: React.FC = () => {
  return (
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
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App