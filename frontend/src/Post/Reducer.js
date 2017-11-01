import {LOAD_POST_SUCCESS} from './ActionTypes'

function post(state = {posts: []}, action) {
    switch (action.type) {
        case LOAD_POST_SUCCESS :
            return {
                ...state,
                posts: action.state,
            };
        default :
            return state
    }
}

export default post;