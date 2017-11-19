import { fetchCategories } from '../Utils/Api';
import { LOAD_CATEGORIES_SUCCESS } from '../Utils/ActionTypes'

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
    return {type: LOAD_CATEGORIES_SUCCESS, state};
}