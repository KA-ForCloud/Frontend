import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from "recoil";
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
let reducer1State = [{id: 1, name: "상품",price:1200, qty:0 }];

export const reducer1 = (state = reducer1State, action) => {
  if (action.type === 'plusQTY') {
    let _state = [...state];
    console.log(_state[action.data]);
    console.log(action.data);
    _state[action.data].qty++;
    return _state;
  } else if (action.type === 'minusQTY') {
    let _state = [...state];
    _state[action.data].qty--;
    return _state;
  } else {
    return state;
  }
}

let store = createStore(combineReducers({
  reducer1
}));

ReactDOM.render(
  <RecoilRoot>
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>
  </RecoilRoot>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();