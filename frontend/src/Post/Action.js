import {fetchPosts, create, findPost} from './Api';
import {LOAD_POST_SUCCESS, CREATE_POST, UPDATE_POST} from './ActionTypes'

export function loadPosts() {
    return function (dispatch) {
        fetchPosts().then(posts => {
            dispatch(loadPostsSuccess(posts))
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadPostsSuccess(state) {
    return {type: LOAD_POST_SUCCESS, state};
}

export function createPost(body) {
    return function (dispatch) {
        create(body).then(post => {
            dispatch(createPostSuccess(post))
        }).catch(error => {
            throw(error);
        });
    }
}

export function createPostSuccess(state) {
    return {type: CREATE_POST, state}
}

export function getPost(postId) {
    return function(dispatch) {
        findPost(postId).then(post => {
            dispatch(updatePost(post))
        }).catch(error => {
            throw(error);
        });
    }
}

export function updatePost(state) {
    return {type: UPDATE_POST, state};
}