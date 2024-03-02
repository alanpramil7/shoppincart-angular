export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  productQuantity: number;
}

export interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}

export interface cartData {
  id: number;
  productId: number;
  userId: number;
  quantity: number;
}
