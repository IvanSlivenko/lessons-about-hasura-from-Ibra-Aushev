import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_ALL_ITEMS } from './queries';

function App() {
  const { data, error, loading} = useQuery(GET_ALL_ITEMS);

  if(loading){
    return <div>
      Завантаження....
    </div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          test-hasura
        </p>
      </header>
      <div>
        
      </div>
    </div>
  );
}

export default App;
