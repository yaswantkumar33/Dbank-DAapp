import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';



// document.querySelector("#Form").addEventListener('submit', function (event) {
//   event.preventDefault();
//   console.log("form syubmitted")
// })
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
