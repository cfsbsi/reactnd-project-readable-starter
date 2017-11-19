import {LOAD_COMMENTS_SUCCESS, UPDATE_COMMENT, CREATE_COMMENT, COMMENT_T0_EDIT} from '../Utils/ActionTypes'
import _ from 'lodash'

function comment(state = {comments: []}, action) {
    switch (action.type) {
        case LOAD_COMMENTS_SUCCESS:
            return {
                comments: _.unionBy(state.comments.concat(action.state.comments), 'id')
            };
        case UPDATE_COMMENT :
            return {
                comments: state.comments.map(comment => {
                    if (comment.id === action.state.id) {
                        return action.state
                    }
                    return comment
                })
            };
        case CREATE_COMMENT:
            return {
                ...state.comments,
                comments: state.comments.concat(action.state)
            };
        case COMMENT_T0_EDIT:
            return {
                ...state,
                commentToEdit: action.state
            };
        default :
            return state
    }
}

export default comment;