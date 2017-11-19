import React from 'react';
import {connect} from 'react-redux';
import {createPost, getPost, editPost} from './Action';

class CreateEditPostComponent extends React.Component {

    componentDidMount() {
        this.setState({pageTitle: this.getPageTitle()})

        if (this.props.location.pathname !== '/posts/create') {
            this.props.getComment(this.props.match.params.postId);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.postToEdit);
    }

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            body: '',
            id: (Math.floor((Math.random() * 1000000) + 1)).toString(),
            timestamp: new Date().getTime(),
            pageTitle: 'Edit Post',
            category: 'react',
            postNotFound: this.postNotFound()
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.props.location.pathname === '/posts/create') {
            this.createPost(this.state)
        } else {
            this.editPost(this.state)
        }

        this.setState({
            title: '',
            author: '',
            body: '',
            category: 'react',
            id: (Math.floor((Math.random() * 1000000) + 1)).toString(),
            timestamp: new Date().getTime(),
            pageTitle: this.getPageTitle(),
        });

        this.props.history.push('/');
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    createPost = (post) => {
        this.props.postPost(post)
    }

    editPost = (post) => {
        this.props.editComment(post)
    }

    getPageTitle = () => {
        if (this.props.location.pathname === '/posts/create') {
            return 'Create Post';
        } else {
            return 'Edit Post';
        }
    }

    postNotFound = () => {

        if (this.props.location.pathname === '/posts/create') {
            return false;
        }

        const postFound = this.props.postReducer.posts.find(post => post.id === this.props.match.params.postId.toString());

        return postFound ? false : true;

    }

    render() {
        if (!this.props.postReducer.posts || this.props.postReducer.posts.length === 0) {
            return null;
        }

        return this.props.commentNotFound ? (
            <div>
                <h1>Post not found</h1>
            </div>
        ) : (
            <div>
                <h1>{this.state.pageTitle}</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Title:
                        <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                    <label>Author:
                        <input type="text" name="author" value={this.state.author} onChange={this.handleInputChange}/>
                    </label>
                    <br/>
                    <label>Category:
                        <select name="category" value={this.state.category} onChange={this.handleInputChange}>
                            {this.props.categoryReducer.categories.map((category) => (
                                <option key={category.name} value={category.name}>{category.name}</option>
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

function mapStateToProps({categoryReducer, postReducer}) {
    return {categoryReducer, postReducer, postToEdit: postReducer.postToEdit}
}

function mapDispatchToProps(dispatch) {
    return {
        postPost: (post) => dispatch(createPost(post)),
        getComment: (postId) => dispatch(getPost(postId)),
        editPost: (post) => dispatch(editPost(post)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditPostComponent);
