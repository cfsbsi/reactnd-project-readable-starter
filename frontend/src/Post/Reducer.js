import {LOAD_POST_SUCCESS, UPDATE_POST} from './ActionTypes'

function post(state = {posts: []}, action) {
    switch (action.type) {
        case LOAD_POST_SUCCESS :
            return {
                ...state,
                posts: action.state,
            };
        case UPDATE_POST :
            return {
                ...state,
                postToEdit: action.state
            };
        default :
            return state
    }
}

export default post;