import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Router from './hoc/Router'
import axios from 'axios';
axios.defaults.baseURL='http://localhost:4000/';
let token=localStorage.getItem('id_token');
axios.defaults.headers.common['x-auth-token']=token;
ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
