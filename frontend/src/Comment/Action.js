import {LOAD_COMMENTS_SUCCESS, UPDATE_COMMENT, COMMENT_T0_EDIT, CREATE_COMMENT} from '../Utils/ActionTypes'
import {fetchComments, delComment, commentVote, findComment, newComment, updateCommentApi} from '../Utils/Api'

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
    return function (dispatch){
        commentVote(comment.id, {option: 'upVote'}).then(
            () => dispatch(updateComment({...comment, voteScore: ++comment.voteScore}))
        ).catch(error => {
            throw(error);
        });
    }
}

export function dislikeComment(comment) {
    return function (dispatch){
        commentVote(comment.id, {option: 'downVote'}).then(
            () => dispatch(updateComment({...comment, voteScore: --comment.voteScore}))
        ).catch(error => {
            throw(error);
        });
    }
}

export function createComment(body) {
    return function (dispatch) {
        newComment(body).then(comment => {
            dispatch(createCommentSuccess(comment))
        }).catch(error => {
            throw(error);
        });
    }
}

export function createCommentSuccess(state) {
    return {type: CREATE_COMMENT, state}
}

export function getComment(commentId) {
    return function(dispatch) {
        findComment(commentId).then(comment => {
            dispatch(addCommentToEdit(comment))
        }).catch(error => {
            throw(error);
        });
    }
}

export function addCommentToEdit(state) {
    return {type: COMMENT_T0_EDIT, state};
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