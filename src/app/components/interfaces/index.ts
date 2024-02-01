export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  description: string;
  image_url: string;
}

export interface Cart extends Product {
  quantity: number;
}
