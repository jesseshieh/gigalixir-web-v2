import { combineReducers } from 'redux';

const createReducer = (asyncReducers: object) =>
    combineReducers({
        ...asyncReducers
    });

export default createReducer;