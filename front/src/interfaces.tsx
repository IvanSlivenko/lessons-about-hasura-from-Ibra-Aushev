export interface Sneakers {
  id: string;
  title: string;
  price: number;
  image_url: string;
}

export interface Items {
  items: Sneakers[];
}

export interface CartItem {
  id: string;
  quantity: number;
  sneaker: Sneakers;
  price: number;
}

export interface CartItems {
  cart: CartItem[];
}

export interface AddCartItem {
  id: string,
  lastQuantity: number;
  price: number;
}

export interface FavoriteItem {
  favorites: Array<{sneaker_Id: string}>
}
