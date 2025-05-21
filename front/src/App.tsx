import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { Items, Sneakers } from "./interfaces";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { ADD_ITEM_TO_CART, GET_ALL_ITEMS, GET_CART } from "./queries";
import Home from "./pages/Home";

import Header from "./components/index";
import { useDebounce } from "./hooks/useDebounce";
import Drawer from "./components/Drawer";

function App() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 500);

  const { data: cartItems } = useQuery(GET_CART);

  const [loadSneakers, { data, error, loading }] = useLazyQuery<Items>(
    GET_ALL_ITEMS,
    {
      variables: { searchValue: `%${debouncedSearchTerm}%` },
    }
  );

  const [addToCartMutation] = useMutation(ADD_ITEM_TO_CART);

  const handleChangeInput = (value: string) => setSearchValue(value);

  const handleAddToCart = (item: Sneakers) => {
    addToCartMutation({
      variables: {
        sneaker_id: item.id,
      },
    });
  };

  const handleRemove = (id: string) => {};

  useEffect(() => {
    if (!data) {
      loadSneakers();
    }

    if (debouncedSearchTerm) {
      loadSneakers();
    }
  }, [debouncedSearchTerm]);

  if (loading) return <div>Завантаження....</div>;

  if (error) return <div>Помилка: {JSON.stringify(error)}</div>;

  return (
    <div className="App">
      {/* <nav>
        <Link to="/">Товари</Link> | <Link to="/about">Про нас</Link>
      </nav> */}

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Drawer
                items={cartItems}
                onClose={() => {}}
                onRemove={handleRemove}
                opened={false}
              />
              <Header onClickCart={() => {}} />
              <Home
                items={data?.items || []}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={handleChangeInput}
                onAddToFavorite={() => {}}
                onAddToCart={handleAddToCart}
                isLoading={loading}
              />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
