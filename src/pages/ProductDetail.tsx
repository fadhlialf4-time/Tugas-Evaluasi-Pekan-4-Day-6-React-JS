import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductContext';
import { Product } from '../types';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { products, localProducts, updateProduct, deleteProduct } = useProducts();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  useEffect(() => {
    const allProducts = [...products, ...localProducts];
    const foundProduct = allProducts.find(p => p.id === parseInt(id || ''));
    
    if (foundProduct) {
      setProduct(foundProduct);
      setEditForm(foundProduct);
    }
  }, [id, products, localProducts]);

  const handleUpdate = () => {
    if (product) {
      updateProduct(product.id, editForm);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (product && window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(product.id);
      navigate('/products');
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <button onClick={() => navigate('/products')} className="back-button">
        ← Back to Products
      </button>
      
      <div className="product-detail-content">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        
        <div className="product-info">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editForm.title}
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
              />
              <textarea
                value={editForm.description}
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
              />
              <input
                type="number"
                value={editForm.price}
                onChange={e => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
              />
              <input
                type="text"
                value={editForm.category}
                onChange={e => setEditForm({ ...editForm, category: e.target.value })}
              />
              <div className="edit-actions">
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h1>{product.title}</h1>
              <p className="category">{product.category}</p>
              <p className="description">{product.description}</p>
              <p className="price">${product.price.toFixed(2)}</p>
              <div className="rating">
                ⭐ {product.rating.rate} ({product.rating.count} reviews)
              </div>
              
              <div className="actions">
                <button className="btn-primary">Tambahkan ke Keranjang</button>
                {user?.isAdmin && (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-secondary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn-danger"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};