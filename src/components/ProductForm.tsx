import React, { useState, useCallback, useEffect } from 'react';
import { Product } from '../types/index'

interface ProductFormProps {
  product?: Product;
  onSubmit: (productData: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    }
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: product.rating
      });
    }
  }, [product]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) || 0 : value,
      }));
    },
    []
  );

  const handleRatingChange = useCallback(
    (field: 'rate' | 'count', value: string) => {
      setFormData(prev => ({
        ...prev,
        rating: {
          ...prev.rating,
          [field]: field === 'rate' ? parseFloat(value) || 0 : parseInt(value) || 0
        }
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
      onCancel();
    },
    [formData, onSubmit, onCancel]
  );

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          step="0.01"
          min="0"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
        />
      </div>
      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Image URL</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Rating (0-5)</label>
        <input
          type="number"
          value={formData.rating.rate}
          onChange={(e) => handleRatingChange('rate', e.target.value)}
          required
          step="0.1"
          min="0"
          max="5"
        />
      </div>
      <div className="form-group">
        <label>Review Count</label>
        <input
          type="number"
          value={formData.rating.count}
          onChange={(e) => handleRatingChange('count', e.target.value)}
          required
          min="0"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {product ? 'Update' : 'Add'} Product
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};
