import {LOAD_POST_SUCCESS, UPDATE_POST, POST_T0_EDIT, CREATE_POST, ORDER_BY_POST} from './ActionTypes'

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
            return {
                ...state.posts,
                posts: state.posts.concat(action.state)
            };
        case ORDER_BY_POST :
            return {posts: state.posts.sort(getSortByField(action.field))}
        default :
            return state
    }
}

function getSortByField(field) {
    console.log(field);
    if(field === 'timestamp'){
        return (post1, post2) => post1[field] - post2[field];
    } else {
        return (post1, post2) => post2[field] - post1[field];
    }
}

export default post;