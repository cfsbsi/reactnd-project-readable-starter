import {LOAD_POSTS_SUCCESS, UPDATE_POST, CREATE_POST, ORDER_BY_POST, ADD_COMMENT_COUNT, SUB_COMMENT_COUNT} from '../Utils/ActionTypes'

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
        case ADD_COMMENT_COUNT :
            return { posts: state.posts.map(post => {
                if (post.id === action.postId) {
                    return {...post, commentCount: post.commentCount + 1}
                }
                return post
            })};
        case SUB_COMMENT_COUNT :
            return { posts: state.posts.map(post => {
                if (post.id === action.postId) {
                    return {...post, commentCount: post.commentCount - 1}
                }
                return post
            })};
        default :
            return state
    }
}

export default post;