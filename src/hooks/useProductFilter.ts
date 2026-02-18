import { useMemo, useState, useCallback } from 'react';
import { Product, FilterOptions, SortOption } from '../types/index';

export const useProductFilter = (products: Product[]) => {
  const [filters, setFilters] = useState<FilterOptions>({
    genders: [],
    categories: [],
    priceRange: [0, 15000],
    searchQuery: '',
    sortBy: 'newest',
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply gender filter
    if (filters.genders.length > 0) {
      result = result.filter(p => filters.genders.includes(p.gender));
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    // Apply price filter
    result = result.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Apply search filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [products, filters]);

  const updateFilter = useCallback((key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      genders: [],
      categories: [],
      priceRange: [0, 15000],
      searchQuery: '',
      sortBy: 'newest',
    });
  }, []);

  const toggleGenderFilter = useCallback((gender: string) => {
    setFilters(prev => ({
      ...prev,
      genders: prev.genders.includes(gender)
        ? prev.genders.filter(g => g !== gender)
        : [...prev.genders, gender],
    }));
  }, []);

  const toggleCategoryFilter = useCallback((category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  }, []);

  return {
    filters,
    filteredProducts,
    updateFilter,
    resetFilters,
    toggleGenderFilter,
    toggleCategoryFilter,
  };
};
