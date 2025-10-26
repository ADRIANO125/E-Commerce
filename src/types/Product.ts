export interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: { rate: number; count: number };
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
