import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

let baseURL = 'https://pokeapi.co/api/v2'

ReactDOM.render(
  <App baseURL={baseURL} />,
  document.getElementById('root')
);
