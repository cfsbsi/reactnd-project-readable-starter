import React from 'react'
import {Col} from 'react-bootstrap'
import {loadComments, deleteComment, likeComment, dislikeComment} from './Action'
import {subCommentCount} from '../Post/Action'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import Confirmation from '../Confirmation/ConfirmationComponent'


class CommentComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            commentToDelete: null
        };
    }

    componentDidMount() {
        this.props.getComments(this.props.postId);
    }

    showModal = (comment) => {
        this.setState({showModal: true, commentToDelete: comment});
    }

    hideModal = () => {
        this.setState({showModal: false});
    }

    delete = () => {
        this.props.delete(this.state.commentToDelete);
        this.props.minusOneCommentOnPost(this.state.commentToDelete.parentId);
        this.hideModal();
    }

    render() {

        const {postId} = this.props
        const filteredComments = this.props.commentReducer.comments
            .filter(comment => comment.parentId === postId)
            .filter(comment => comment.deleted === false)
            .sort((c1, c2) => c2.voteScore - c1.voteScore);

        return (
            <div>
                {filteredComments.length > 0 ?(<h4>Comments:</h4>):false}
                <Col md={8} mdOffset={2}>
                    {filteredComments
                        .map(comment => (
                        <div style={{marginBottom: 30}} key={comment.id}>
                            <p><b>author:</b> {comment.author}</p>
                            <p><b>comment:</b> {comment.body}</p>
                            <p><b>voteScore:</b> {comment.voteScore}</p>
                            <button onClick={() => this.props.likeComment(comment)} className="glyphicon glyphicon-thumbs-up"></button>
                            <button onClick={() => this.props.dislikeComment(comment)} className="glyphicon glyphicon-thumbs-down"></button>
                            <Link to={`/comments/edit/${comment.id}`}>
                                <button className="glyphicon glyphicon-pencil"></button>
                            </Link>
                            <button className="glyphicon glyphicon-trash" onClick={() => this.showModal(comment)}/>
                        </div>
                    ))}
                </Col>
                <Confirmation show={this.state.showModal}
                              title="Deleting Comment"
                              confirmation="Are you sure you want to delete this?"
                              proceed={() => this.delete()}
                              cancel={this.hideModal}
                              okLabbel="Yes"
                              dismiss={() => this.hideModal()}
                />
            </div>
        );
    }
}

function mapStateToProps({commentReducer}) {
    return {commentReducer};
}

function mapDispatchToProps(dispatch) {
    return {
        getComments: (commentId) => dispatch(loadComments(commentId)),
        delete: (comment) => dispatch(deleteComment(comment)),
        likeComment: (post) => dispatch(likeComment(post)),
        dislikeComment: (post) => dispatch(dislikeComment(post)),
        minusOneCommentOnPost: (postId) => dispatch(subCommentCount(postId))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentComponent));
