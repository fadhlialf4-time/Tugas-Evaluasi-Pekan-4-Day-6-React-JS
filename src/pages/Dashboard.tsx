import React, { useState, useCallback } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ProductForm } from '../components/ProductForm';
import { useProducts } from '../contexts/ProductContext';
import { useProductStats } from '../hooks/useProducts';
import { Product } from '../types';

export const Dashboard: React.FC = () => {
  const { localProducts, addProduct, updateProduct, deleteProduct } = useProducts();
  const { totalProducts, totalValue, categories } = useProductStats();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const handleEdit = useCallback((product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  }, []);

  const handleDelete = useCallback((id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  }, [deleteProduct]);

  const handleSubmit = useCallback((productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setShowForm(false);
    setEditingProduct(undefined);
  }, [editingProduct, addProduct, updateProduct]);

  return (
    <div className="dashboard">
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Value</h3>
          <p>${totalValue}</p>
        </div>
        <div className="stat-card">
          <h3>Categories</h3>
          <p>{categories.length}</p>
        </div>
      </div>

      <div className="dashboard-header">
        <h2>Manage Products</h2>
        <button
          onClick={() => {
            setEditingProduct(undefined);
            setShowForm(true);
          }}
          className="btn-primary"
        >
          Add New Product
        </button>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <ProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(undefined);
              }}
            />
          </div>
        </div>
      )}

      <div className="products-grid">
        {localProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isLocal
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {localProducts.length === 0 && (
        <div className="empty-state">
          <p>No local products yet. Add your first product!</p>
        </div>
      )}
    </div>
  );
};
