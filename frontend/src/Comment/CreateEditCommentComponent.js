import React from 'react';
import {connect} from 'react-redux';
import {createComment, getComment, editComment} from './Action';

class CreateEditCommentComponent extends React.Component {

    componentDidMount() {
        this.setState({pageTitle: this.props.pageTitle})

        if (this.props.pageTitle !== 'Create Comment') {
            this.props.getComment(this.props.commentId)
                .then(comment => this.setState(comment));
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.postReducer.posts.length > 0){
            this.setState({parentId: nextProps.postReducer.posts[0].id})
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            author: '',
            body: '',
            parentId: '',
            id: '',
            timestamp: 0,
            category: 'react',
            commentNotFound: this.commentNotFound()
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.createOrEditComment()

        this.props.history.push('/');
    }

    createOrEditComment = () => {
        if (this.props.pageTitle === 'Create Comment') {
            this.createComment(this.state)
        } else {
            this.editComment(this.state)
        }
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    createComment = (comment) => {
        this.props.postComment(comment)
    }

    editComment = (comment) => {
        this.props.editComment(comment)
    }

    commentNotFound = () => {

        if (this.props.pageTitle === 'Create Comment') {
            return false;
        }

        const commentFound = this.props.commentReducer.comments.find(comment => comment.id === this.props.commentId);

        return commentFound ? false : true;

    }

    render() {

        return this.props.commentNotFound ? (
            <div>
                <h1>Comment not found</h1>
            </div>
        ) : (
            <div>
                <h1>{this.state.pageTitle}</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Author:
                        <input type="text" name="author" value={this.state.author} onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                    <label>Post:
                        <select name="parentId" value={this.state.parentId} onChange={this.handleInputChange}>
                            {this.props.postReducer.posts.map((post, index) => (
                                <option key={index} value={post.id}>{post.title}</option>
                            ))}
                        </select>
                    </label>
                    <br/>
                    <label>Body:
                        <textarea name="body" value={this.state.body} onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                    <input type="submit" value="Save"/>
                    <button onClick={this.props.history.goBack}>Back</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({commentReducer, postReducer}) {
    return {postReducer, commentReducer, commentToEdit: commentReducer.commentToEdit}
}

function mapDispatchToProps(dispatch) {
    return {
        postComment: (comment) => dispatch(createComment(comment)),
        getComment: (commentId) => getComment(commentId),
        editComment: (comment) => dispatch(editComment(comment)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditCommentComponent);
