import {combineReducers} from 'redux';
import categoryReducer from './Category/Reducer';
import postReducer from './Post/Reducer';

const rootReducer = combineReducers({
    categoryReducer, postReducer
});

export default rootReducer;