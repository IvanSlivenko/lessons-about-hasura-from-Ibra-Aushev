import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import {
  CartItem,
  CartItems,
  Items,
  Sneakers,
  AddCartItem,
  FavoriteItem,
} from "./interfaces";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import {
  ADD_ITEM_TO_CART,
  GET_ALL_ITEMS,
  GET_CART,
  REMOVE_ITEM_FROM_CART,
  ADD_TO_FAVORITE,
  GET_ALL_FAVORITES,
} from "./queries";
import Home from "./pages/Home";

import Header from "./components/index";
import { useDebounce } from "./hooks/useDebounce";
import Drawer from "./components/Drawer";
import AppContext from "./context";
import { client } from "./index";

function App() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 500);

  const { data: cartItems } = useQuery<CartItems>(GET_CART);
  const { data: favoriteItems } = useQuery<FavoriteItem>(GET_ALL_FAVORITES);

  const [loadSneakers, { data, error, loading }] = useLazyQuery<Items>(
    GET_ALL_ITEMS,
    {
      variables: { searchValue: `%${debouncedSearchTerm}%` },
    }
  );

  const [addToCartMutation] = useMutation(ADD_ITEM_TO_CART);
  const [removeItemFromCartMutation] = useMutation(REMOVE_ITEM_FROM_CART);
  const [addToFavoriteMutation] = useMutation(ADD_TO_FAVORITE);

  const handleChangeInput = (value: string) => setSearchValue(value);

  // const handleAddToCart = (item: AddCartItem ) => {
  //   addToCartMutation({
  //     variables: {
  //       sneaker_id: item.id,
  //       quantity: item.lastQuantity + 1,
  //       price: item.price,
  //     },
  //   });
  //   client.refetchQueries({
  //     include: ['GET_ALL_ITEMS']
  //   })
  // };

  const handleAddToCart = async (item: AddCartItem) => {
    try {
      await addToCartMutation({
        variables: {
          sneaker_id: item.id,
          quantity: item.lastQuantity + 1,
          price: item.price,
        },
      });

      await client.refetchQueries({
        include: ["MyQuery"],
      });
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      alert("Сталася помилка при додаванні до кошика. Перевірте консоль.");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await removeItemFromCartMutation({
        variables: {
          sneaker_id: id,
        },
      });

      await client.refetchQueries({
        include: ["MyQuery"],
      });
    } catch (error) {
      console.error("❌ Error remove from cart:", error);
      alert("Сталася помилка при видаленні з  кошика. Перевірте консоль.");
    }
  };

  const handleAddTofavorite = async (sneaker_Id: string) => {
    try {
      await addToFavoriteMutation({
        variables: {
          sneaker_id: sneaker_Id, // ← Назва має збігатися з GraphQL-маркером
        },
      });

      // await client.refetchQueries({
      //   include: ["MyQuery"],
      // });
    } catch (error) {
      console.error("❌ Error add to Favorite:", error);
      alert("Сталася помилка при додаванні до Обраних. Перевірте консоль.");
    }
  };

  // useEffect(() => {
  //   console.log('restarting useEffect')
  //   if (!data) {
  //     loadSneakers();
  //   }

  //   if (debouncedSearchTerm) {
  //     loadSneakers();
  //   }
  // }, [debouncedSearchTerm]);

  useEffect(() => {
    loadSneakers();
  }, [debouncedSearchTerm, cartItems, data]);

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
              <AppContext.Provider
                value={{
                  cartItems: cartItems?.cart || [],
                  setCartItem: handleAddToCart,
                }}
              >
                <Drawer
                  items={cartItems?.cart || []}
                  onClose={() => {
                    setDrawerOpened(false);
                  }}
                  onRemove={handleRemove}
                  opened={drawerOpened}
                />
                <Header
                  onClickCart={() => {
                    setDrawerOpened(true);
                  }}
                />
                <Home
                  favoritedItems={favoriteItems?.favorites || []}
                  items={data?.items || []}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onChangeSearchInput={handleChangeInput}
                  onAddToFavorite={handleAddTofavorite}
                  onAddToCart={handleAddToCart}
                  isLoading={loading}
                />
              </AppContext.Provider>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
