import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import adminDataReducer from './store/reducers/adminData';
import modalReducer from './store/reducers/modal';
import groupReducer from './store/reducers/groups';
import courseReducer from './store/reducers/courses';
import archiveReducer from './store/reducers/archive';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  adminData: adminDataReducer,
  modal: modalReducer,
  group: groupReducer,
  course: courseReducer,
  archive: archiveReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));


const app = (
  <Provider store={store}>
    <App />
  </Provider>
);


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
