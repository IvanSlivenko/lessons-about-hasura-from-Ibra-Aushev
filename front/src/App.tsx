import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";


import { Items } from "./interfaces";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_ITEMS } from "./queries";
import Home from "./pages/Home";

import Header from "./components/index";
import { useDebounce } from "./hooks/useDebounce";


function App() {

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 500);
  const [loadSneakers, { data, error, loading }] = useLazyQuery<Items>(
    GET_ALL_ITEMS,
    {
      variables: { searchValue: `%${debouncedSearchTerm}%` },
    }
  );

  const handleChangeInput = (value: string) => setSearchValue(value);

  useEffect(() => {

    if(!data){
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
