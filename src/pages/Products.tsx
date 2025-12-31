// src/pages/Products.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useProducts } from '../contexts/ProductContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Products: React.FC = () => {
  const { products, localProducts, loading, error, fetchProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const allProducts = useMemo(() => [...products, ...localProducts], [products, localProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchTerm, selectedCategory]);

  const categories = useMemo(() => {
    const uniqueCategories = ['all', ...new Set(allProducts.map(p => p.category))];
    return uniqueCategories.sort();
  }, [allProducts]);

  if (loading && products.length === 0) {
    return (
      <div className="main-content">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="main-content">
        <div className="error-message">
          <h2>Error loading products</h2>
          <p>{error}</p>
          <button onClick={fetchProducts} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <ErrorBoundary>
        <div className="products-page">
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">Browse our collection of products</p>
          
          <div className="filters">
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                  {localProducts.find(p => p.id === product.id) && (
                    <span className="local-badge">Local</span>
                  )}
                </div>
                <div className="product-content">
                  <h3 title={product.title}>{product.title}</h3>
                  <p className="category">
                    📁 {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </p>
                  <p className="description" title={product.description}>
                    {product.description.substring(0, 100)}...
                  </p>
                  <div className="product-footer">
                    <span className="price">${product.price.toFixed(2)}</span>
                    <div className="rating">
                      ⭐ {product.rating.rate} ({product.rating.count})
                    </div>
                  </div>
                  <div className="actions">
                    <Link to={`/products/${product.id}`} className="btn btn-primary">
                      View Details
                    </Link>
                    <button className="btn-secondary">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No products found. Try changing your search criteria.</p>
            </div>
          )}
          
          <div className="products-info">
            <p>Showing {filteredProducts.length} of {allProducts.length} products</p>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};