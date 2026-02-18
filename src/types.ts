export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  gender: string;
  category: string;
  isNew?: boolean;
}

export interface User {
  name: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  joinDate?: string;
}