import {fetchPosts, create} from './Api';
import {LOAD_POST_SUCCESS, CREATE_POST} from './ActionTypes'

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