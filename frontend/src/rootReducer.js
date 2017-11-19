import {combineReducers} from 'redux';
import categoryReducer from './Category/Reducer';
import postReducer from './Post/Reducer';
import commentReducer from './Comment/Reducer';

const rootReducer = combineReducers({
    categoryReducer, postReducer, commentReducer
});

export default rootReducer;