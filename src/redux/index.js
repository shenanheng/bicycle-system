// redux
import { createStore, applyMiddleware, compose } from 'redux';
import creactSagaMiddleware from 'redux-saga';
import Reducer from './reducer/index';
import mySages from './saga/index';


const sagaMiddleware = creactSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(Reducer, enhancer);
sagaMiddleware.run(mySages);

export default store;
