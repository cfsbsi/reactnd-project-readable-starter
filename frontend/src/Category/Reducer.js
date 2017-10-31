import {LOAD_CATEGORY_SUCCESS} from './ActionTypes'

function category(state = {categories: []}, action) {
    switch (action.type) {
        case LOAD_CATEGORY_SUCCESS :
            return {
                ...state,
                categories: action.state.categories,
            };
        default :
            return state
    }
}

export default category;