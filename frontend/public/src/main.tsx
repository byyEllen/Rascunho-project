import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.scss'; // se já tiver criado o Sass global

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
