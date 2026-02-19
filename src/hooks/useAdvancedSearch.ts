import { useMemo, useState } from 'react';
import { Product } from '../types/index';

export const useAdvancedSearch = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 50000,
    brands: [] as string[],
    ratings: 0,
    inStockOnly: false,
    newArrivalsOnly: false,
  });

  const results = useMemo(() => {
    let filtered = [...products];

    // Search term matching
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }

    // Price range filtering
    filtered = filtered.filter(p =>
      p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // Brand filtering
    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => filters.brands.includes(p.brand));
    }

    // Rating filtering
    if (filters.ratings > 0) {
      filtered = filtered.filter(p => (p.rating || 0) >= filters.ratings);
    }

    // Stock availability
    if (filters.inStockOnly) {
      filtered = filtered.filter(p => (p.stock || 0) > 0);
    }

    // New arrivals only
    if (filters.newArrivalsOnly) {
      filtered = filtered.filter(p => p.isNew);
    }

    return filtered;
  }, [searchTerm, filters, products]);

  return {
    results,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
  };
};
