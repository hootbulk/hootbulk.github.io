import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Main from './Main';
import './index.css';

let baseURL = 'https://pokeapi.co/api/v2'

ReactDOM.render(
  <Main />,
  document.getElementById('main')
);

ReactDOM.render(
  <App baseURL={baseURL} />,
  document.getElementById('root')
);
