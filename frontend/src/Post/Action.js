import {fetchPosts, create, findPost, delet, vote, update} from './Api';
import {LOAD_POST_SUCCESS, CREATE_POST, UPDATE_POST, POST_T0_EDIT, ORDER_BY_POST} from './ActionTypes'

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
            dispatch(addPostToEdit(post))
        }).catch(error => {
            throw(error);
        });
    }
}

export function addPostToEdit(state) {
    return {type: POST_T0_EDIT, state};
}

export function updatePost(state) {
    return {type: UPDATE_POST, state};
}

export function likePost(post) {
    return function (dispatch){
        vote(post.id, {option: 'upVote'}).then(
            () => dispatch(updatePost({...post, voteScore: ++post.voteScore}))
        ).catch(error => {
            throw(error);
        });
    }
}

export function dislikePost(post) {
    return function (dispatch){
        vote(post.id, {option: 'downVote'}).then(
            () => dispatch(updatePost({...post, voteScore: --post.voteScore}))
        ).catch(error => {
            throw(error);
        });
    }
}

export function deletePost(post) {
    return function (dispatch) {
        delet(post.id).then(post => {
            dispatch(deletePostSuccess(post))
        }).catch(error => {
            throw(error);
        });
    }
}

export function deletePostSuccess(post) {
    return updatePost({...post, deleted: true})
}

export function editPost(body) {
    return function (dispatch) {
        update(body).then(post => {
            dispatch(updatePost(post))
        }).catch(error => {
            throw(error);
        });
    }
}

export function orderBy(field) {
    return {type: ORDER_BY_POST, field}
}