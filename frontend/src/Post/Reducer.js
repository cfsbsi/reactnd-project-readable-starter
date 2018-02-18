import {LOAD_POSTS_SUCCESS, UPDATE_POST, CREATE_POST, ORDER_BY_POST} from '../Utils/ActionTypes'

function post(state = {posts: [], sortBy: 'voteScore'}, action) {
    switch (action.type) {
        case LOAD_POSTS_SUCCESS :
            return {
                ...state,
                posts: action.state,
            };
        case UPDATE_POST :
            return {
                posts: state.posts.map(post => {
                    if (post.id === action.state.post.id) {
                        return action.state.post
                    }
                    return post
                }), sortBy: state.sortBy
            };
        case CREATE_POST :
            return {
                ...state,
                posts: state.posts.concat(action.state)
            };
        case ORDER_BY_POST :
            return {...state, sortBy: action.field}
        default :
            return state
    }
}

export default post;