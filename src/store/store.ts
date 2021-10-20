import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const store = createStore(rootReducer, applyMiddleware(thunk));
// eslint-disable-next-line no-console
console.log('my store', store.getState());

export default store;
