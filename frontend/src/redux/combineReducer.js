import { combineReducers } from 'redux'
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import userReducer from './userReducer'

export const combineReducer = combineReducers({
    userReducer: userReducer,
    cartReducer: cartReducer,
    orderReducer: orderReducer
});