import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_ITEMS } from "./queries";
import { Items, Sneakers } from "./interfaces";

function App() {
  const { data, error, loading } = useQuery<Items>(GET_ALL_ITEMS);

  if (loading) {
    return <div>Завантаження....</div>;
  }

  return (
    <div className="App">
      {
        data?.items.map((item) => (<div key={item.id}> {item.title} </div>))
      }
    </div>
  );
}

export default App;
