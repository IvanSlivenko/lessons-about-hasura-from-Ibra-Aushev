import React from 'react';
import { CartItems, CartItem, AddCartItem } from './interfaces';

const AppContext = React.createContext<{cartItems: CartItem[], setCartItem: (item: AddCartItem) => void }>({
    cartItems: [],
    setCartItem: () => {}
});

export default AppContext;