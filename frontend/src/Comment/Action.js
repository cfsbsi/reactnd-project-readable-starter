import {LOAD_COMMENTS_SUCCESS, UPDATE_COMMENT, CREATE_COMMENT} from '../Utils/ActionTypes'
import {fetchComments, delComment, commentVote, findComment, newComment, updateCommentApi} from '../Utils/Api'
import {loadPosts} from '../Post/Action'
import Uuid from 'uuid'

export function loadComments(commentId) {
    return function (dispatch) {
        fetchComments(commentId).then(comments => {
            dispatch(loadCommentsSuccess({comments, commentId}))
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadCommentsSuccess(state) {
    return {type: LOAD_COMMENTS_SUCCESS, state};
}

export function deleteComment(comment) {
    return function (dispatch) {
        delComment(comment.id).then(comment => {
            dispatch(deleteCommentSuccess(comment))
        }).then(() => {
            dispatch(loadPosts());
        }).catch(error => {
            throw(error);
        });
    }
}

export function deleteCommentSuccess(comment) {
    return updateComment({...comment, deleted: true})
}


export function updateComment(state) {
    return {type: UPDATE_COMMENT, state};
}

export function likeComment(comment) {
    return function (dispatch) {
        commentVote(comment.id, {option: 'upVote'}).then(
            () => dispatch(updateComment({...comment, voteScore: ++comment.voteScore}))
        ).catch(error => {
            throw(error);
        });
    }
}

export function dislikeComment(comment) {
    return function (dispatch) {
        commentVote(comment.id, {option: 'downVote'}).then(
            () => dispatch(updateComment({...comment, voteScore: --comment.voteScore}))
        ).catch(error => {
            throw(error);
        });
    }
}

export function createComment(body) {
    const completeComment = {...body, timestamp: Date.now(), id: Uuid()}
    return function (dispatch) {
        newComment(completeComment).then(comment => {
            dispatch(createCommentSuccess(comment))
        }).then(() => {
            dispatch(loadPosts());
        }).catch(error => {
            throw(error);
        });
    }
}

export function createCommentSuccess(state) {
    return {type: CREATE_COMMENT, state}
}

export function getComment(commentId) {
    return findComment(commentId)
        .catch(error => {
            throw(error);
        });
}

export function editComment(body) {
    return function (dispatch) {
        updateCommentApi(body).then(comment => {
            dispatch(updateComment(comment))
        }).catch(error => {
            throw(error);
        });
    }
}