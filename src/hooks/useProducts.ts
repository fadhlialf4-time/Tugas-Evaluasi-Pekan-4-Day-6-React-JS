import { useMemo } from 'react';
import { useProducts } from '../contexts/ProductContext';

export const useProductStats = () => {
  const { products, localProducts } = useProducts();

  const totalProducts = useMemo(() => {
    return products.length + localProducts.length;
  }, [products, localProducts]);

  const totalValue = useMemo(() => {
    const apiValue = products.reduce((sum, product) => sum + product.price, 0);
    const localValue = localProducts.reduce((sum, product) => sum + product.price, 0);
    return (apiValue + localValue).toFixed(2);
  }, [products, localProducts]);

  const categories = useMemo(() => {
    const allCategories = [...products, ...localProducts].map(p => p.category);
    return [...new Set(allCategories)];
  }, [products, localProducts]);

  return {
    totalProducts,
    totalValue,
    categories,
  };
};