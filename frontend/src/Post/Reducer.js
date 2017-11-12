import {LOAD_POST_SUCCESS, UPDATE_POST, POST_T0_EDIT, CREATE_POST} from './ActionTypes'

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
        case CREATE_POST :
            console.log(state);
            return {
                ...state.posts,
                posts: state.posts.concat(action.state)
            }
        default :
            return state
    }
}

export default post;