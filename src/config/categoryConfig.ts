// Footwear Category Configuration for Navigation
export interface CategoryItem {
  name: string;
  subcategories: string[];
  color: string;
  icon?: string;
}

export interface CategoriesConfig {
  Men: CategoryItem;
  Women: CategoryItem;
  Kids: CategoryItem;
}

export const categoryConfig: CategoriesConfig = {
  Men: {
    name: 'Men',
    color: '#ee5f73',
    subcategories: [
      'Casual',
      'Sports',
      'Formal',
      'Ethnic'
    ]
  },
  Women: {
    name: 'Women',
    color: '#fb56c1',
    subcategories: [
      'Casual',
      'Sports',
      'Formal',
      'Heels'
    ]
  },
  Kids: {
    name: 'Kids',
    color: '#f26a10',
    subcategories: [
      'Casual',
      'Sports',
      'School Shoes',
      'Ethnic'
    ]
  }
};

// Map category names to data.ts category values for filtering
export const categoryMapping: Record<string, string> = {
  'Casual': 'Casual',
  'Sports': 'Sports',
  'Formal': 'Formal',
  'Heels': 'Heels',
  'School Shoes': 'School Shoes',
  'Ethnic': 'Ethnic'
};
