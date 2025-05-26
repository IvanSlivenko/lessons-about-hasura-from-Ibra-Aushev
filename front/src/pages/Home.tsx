import React from "react";

import Card from "../components/Card";
import { AddCartItem, CartItem, FavoriteItem, Items, Sneakers } from "../interfaces"
import { useCart } from "../hooks/useCart";

type Props = {
  items:  Sneakers[]
  favoritedItems: Array<{sneaker_id: string}>
  searchValue: string;
  setSearchValue: (value: string)=> void;
  onChangeSearchInput: (value: string)=> void;
  onAddToFavorite: (sneaker_id: string)=> void;
  onAddToCart: (value: AddCartItem)=> void;
  isLoading: boolean;
};

function Home({
  items,
  favoritedItems,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}: Props ) {

   
  const { cartItems } = useCart();


  const makeComposeSneakerAndCartObject = (item: Sneakers): AddCartItem => {
  const cartItem = cartItems.find((cartItem) => cartItem.sneaker.id === item.id);
  return {
    id: item.id,
    price: item.price,
    lastQuantity: cartItem ? cartItem.quantity : 0,
  };
};


  const renderItems = () => {
    const filtredItems = items.filter((item) =>true);
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={() => onAddToFavorite(item.id)}
        onPlus={() => onAddToCart(makeComposeSneakerAndCartObject(item))}
        loading={isLoading}
        {...item}
        isItemAdded={cartItems.filter(filterItem => filterItem.sneaker.id === item.id).length}
        favorited = {favoritedItems.filter(filterItem => filterItem.sneaker_id === item.id).length}
        
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Пошук за запитом: "${searchValue}"` : "Всі товари"}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input
            onChange={(e)=>onChangeSearchInput(e.target.value)}
            value={searchValue}
            placeholder="Пошук..."
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
