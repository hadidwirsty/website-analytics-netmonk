import React from 'react';
import ReactDOM from 'react-dom';

import { AppRoute } from './routes';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <AppRoute />
  </React.StrictMode>,
  document.getElementById('root')
);
