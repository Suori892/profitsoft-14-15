import React from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import App from './containers/App.jsx';
import userReducer from './reducers/user';
import itemsReducer from '../pages/Items/reducers/items.js';

const rootReducer = combineReducers({
  user: userReducer,
  items: itemsReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
);

export default () => (
  <Provider store={store} >
    <App />
  </Provider>
)
