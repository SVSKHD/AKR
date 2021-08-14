import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css"
import Routing from './App';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import rootReducer from "./reducers"

const store = createStore (rootReducer , composeWithDevTools())

ReactDOM.render(
<Provider store={store}>
<Routing/>
</Provider>
,document.getElementById('root'));


