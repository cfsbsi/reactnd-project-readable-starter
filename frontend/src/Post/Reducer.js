import {LOAD_POST_SUCCESS, UPDATE_POST, POST_T0_EDIT} from './ActionTypes'

function post(state = {posts: []}, action) {
    switch (action.type) {
        case LOAD_POST_SUCCESS :
            return {
                ...state,
                posts: action.state,
            };
        case UPDATE_POST :
            return {
                posts: state.posts.map(post => {
                    if (post.id === action.state.id) {
                        return action.state
                    }
                    return post
                })
            };
        case POST_T0_EDIT :
            return {
                ...state,
                postToEdit: action.state
            };
        default :
            return state
    }
}

export default post;