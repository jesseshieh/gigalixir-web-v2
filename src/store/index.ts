import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import createReducer from "./reducer";


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store: any = createStore(createReducer({}), enhancer);

store.asyncReducers = {};

export const injectReducer = (key: string, reducer: object) => {
  if (store.asyncReducers[key]) {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export default store;
