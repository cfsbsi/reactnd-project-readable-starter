import {LOAD_CATEGORIES_SUCCESS} from '../Utils/ActionTypes'

function category(state = {categories: []}, action) {
    switch (action.type) {
        case LOAD_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.state.categories,
            };
        default :
            return state
    }
}

export default category;