import {fetchPosts} from './Api';
import {LOAD_POST_SUCCESS} from './ActionTypes'

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