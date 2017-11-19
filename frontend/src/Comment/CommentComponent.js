import React from 'react'
import {Col} from 'react-bootstrap'
import {loadComments, deleteComment, likeComment, dislikeComment} from './Action'
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
        this.hideModal();
    }

    render() {

        const {postId} = this.props
        return (
            <div>
                <h4>Comments:</h4>
                <Col md={8} mdOffset={2}>
                    {this.props.commentReducer.comments
                        .filter(comment => comment.parentId === postId)
                        .filter(comment => comment.deleted === false)
                        .sort((c1, c2) => c2.voteScore - c1.voteScore)
                        .map(comment => (
                        <div key={comment.id}>
                            <p>author: {comment.author}</p>
                            <p>comment: {comment.body}</p>
                            <p>voteScore: {comment.voteScore}</p>
                            <span onClick={() => this.props.likeComment(comment)} className="glyphicon glyphicon-thumbs-up"></span>
                            <span onClick={() => this.props.dislikeComment(comment)} className="glyphicon glyphicon-thumbs-down"></span>
                            <Link to={`/comments/edit/${comment.id}`}>
                                <button className="btn btn-default">edit</button>
                            </Link>
                            <button className="btn btn-default" onClick={() => this.showModal(comment)}>
                                delete
                            </button>
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
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentComponent));
