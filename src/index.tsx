import { createServer } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

createServer({
  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      return [{
        id: 0,
        title: 'Aluguel',
        category: 'Casa',
        amount: 500,
        type: 'withdraw',
      }]
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
