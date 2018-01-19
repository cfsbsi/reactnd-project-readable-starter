import React from 'react';
import {connect} from 'react-redux';
import {createComment, getComment, editComment} from './Action';

class CreateEditCommentComponent extends React.Component {

    componentDidMount() {
        this.setState({pageTitle: this.getPageTitle()})

        if (this.props.location.pathname !== '/comments/create') {
            this.props.getComment(this.props.match.params.commentId);
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
            id: (Math.floor((Math.random() * 1000000) + 1)).toString(),
            timestamp: new Date().getTime(),
            pageTitle: 'Edit Comment',
            category: 'react',
            commentNotFound: this.commentNotFound()
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.props.location.pathname === '/comments/create') {
            this.createComment(this.state)
        } else {
            this.editComment(this.state)
        }

        this.props.history.push('/');
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

    getPageTitle = () => {
        if (this.props.location.pathname === '/comments/create') {
            return 'Create Comment';
        } else {
            return 'Edit Comment';
        }
    }

    commentNotFound = () => {

        if (this.props.location.pathname === '/comments/create') {
            return false;
        }

        const commentFound = this.props.commentReducer.comments.find(comment => comment.id === this.props.match.params.commentId.toString());

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
        getComment: (commentId) => dispatch(getComment(commentId)),
        editComment: (comment) => dispatch(editComment(comment)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditCommentComponent);
