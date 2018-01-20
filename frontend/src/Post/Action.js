import {fetchPosts, newPost, findPost, delPost, postVote, update} from '../Utils/Api';
import {LOAD_POSTS_SUCCESS, CREATE_POST, UPDATE_POST, ORDER_BY_POST} from '../Utils/ActionTypes'
import Uuid from 'uuid'

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
    return {type: LOAD_POSTS_SUCCESS, state};
}

export function createPost(body) {
    const completePost = {...body, timestamp: Date.now(), id: Uuid()}
    return function (dispatch) {
        newPost(completePost).then(post => {
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
    return findPost(postId)
        .catch(error => {
            throw(error);
        });
}

export function updatePost(state) {
    return {type: UPDATE_POST, state};
}

export function likePost(post) {
    return function (dispatch){
        postVote(post.id, {option: 'upVote'}).then(
            () => dispatch(updatePost({...post, voteScore: ++post.voteScore}))
        ).catch(error => {
            throw(error);
        });
    }
}

export function dislikePost(post) {
    return function (dispatch){
        postVote(post.id, {option: 'downVote'}).then(
            () => dispatch(updatePost({...post, voteScore: --post.voteScore}))
        ).catch(error => {
            throw(error);
        });
    }
}

export function deletePost(post) {
    return function (dispatch) {
        delPost(post.id).then(post => {
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