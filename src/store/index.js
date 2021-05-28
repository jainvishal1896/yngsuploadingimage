import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './Reducers';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default store = createStoreWithMiddleware(reducer);
