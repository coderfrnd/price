import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Context from './Context';
import "react-alice-carousel/lib/alice-carousel.css";

ReactDOM.render(
  <div>
    <Context>
    <App />
 
    </Context>
  </div>,
  document.getElementById('root')
);

