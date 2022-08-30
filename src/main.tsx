import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import { App } from './App';
import './global.scss';

const root = document.getElementById('root') as HTMLElement;

Modal.setAppElement(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
