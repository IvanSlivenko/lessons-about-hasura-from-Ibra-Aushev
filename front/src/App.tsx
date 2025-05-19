import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { Items } from "./interfaces";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_ITEMS } from "./queries";
import Home from "./pages/Home";

import Header from "./components/index";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const handleChangeInput = (value: string) => setSearchValue(value);

  const [loadSneakers, { data, error, loading }] = useLazyQuery<Items>(
    GET_ALL_ITEMS,
    {
      variables: { searchValue: `%${searchValue}%` },
    }
  );

  useEffect(() => {
    loadSneakers();
  }, [searchValue]);

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
              <Header onClickCart={() => {}} />
              <Home
                items={data?.items || []}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={handleChangeInput}
                onAddToFavorite={() => {}}
                onAddToCart={() => {}}
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
