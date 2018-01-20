import {LOAD_POSTS_SUCCESS, UPDATE_POST, CREATE_POST, ORDER_BY_POST} from '../Utils/ActionTypes'

function post(state = {posts: []}, action) {
    switch (action.type) {
        case LOAD_POSTS_SUCCESS :
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
        case CREATE_POST :
            return {
                ...state,
                posts: state.posts.concat(action.state)
            };
        case ORDER_BY_POST :
            return {posts: state.posts.sort(getSortByField(action.field))}
        default :
            return state
    }
}

function getSortByField(field) {
    if(field === 'timestamp'){
        return (post1, post2) => post1[field] - post2[field];
    } else {
        return (post1, post2) => post2[field] - post1[field];
    }
}

export default post;