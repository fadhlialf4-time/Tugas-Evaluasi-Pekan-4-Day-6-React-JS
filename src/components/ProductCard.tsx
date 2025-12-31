import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/index';

interface ProductCardProps {
  product: Product;
  isLocal?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isLocal = false,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
        {isLocal && <span className="local-badge">Local</span>}
      </div>
      <div className="product-content">
        <h3>{product.title}</h3>
        <p className="category">{product.category}</p>
        <p className="description">{product.description.substring(0, 100)}...</p>
        <div className="product-footer">
          <span className="price">${product.price.toFixed(2)}</span>
          <div className="rating">
            ⭐ {product.rating.rate} ({product.rating.count})
          </div>
        </div>
        <div className="actions">
          <Link to={`/products/${product.id}`} className="btn btn-primary">
            Detail
          </Link>
          {onEdit && (
            <button
              onClick={() => onEdit(product)}
              className="btn btn-secondary"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(product.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
