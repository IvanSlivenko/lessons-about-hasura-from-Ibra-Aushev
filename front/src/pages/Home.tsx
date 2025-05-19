import React from "react";

import Card from "../components/Card";
import { Items, Sneakers } from "../interfaces"
import { data } from "react-router-dom";

type Props = {
  items:  Sneakers[]
  searchValue: string;
  setSearchValue: (value: string)=> void;
  onChangeSearchInput: (value: string)=> void;
  onAddToFavorite: (value: string)=> void;
  onAddToCart: (value: unknown)=> void;
  isLoading: boolean;
};

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}: Props ) {

   

  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      // item.title.toLowerCase().includes(searchValue.toLowerCase())
    true
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        // imageUrl={data}
        onFavorite={() => onAddToFavorite(item)}
        onPlus={() => onAddToCart(item)}
        loading={isLoading}
        {...item}
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
