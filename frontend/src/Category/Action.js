import { fetchCategories } from './Api';
import { LOAD_CATEGORY_SUCCESS } from './ActionTypes'

export function loadCategories() {
    return function (dispatch) {
        fetchCategories().then(categories => {
            dispatch(loadCategoriesSuccess(categories))
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadCategoriesSuccess(state) {
    return {type: LOAD_CATEGORY_SUCCESS, state};
}