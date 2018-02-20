import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {likePost, dislikePost} from '../Post/Action';

class PostComponent extends React.Component {

    like = (post) => {
        this.props.likePost(post);
    }

    dislike = (post) => {
        this.props.dislikePost(post);
    }

    render() {
        const {post, showBody} = this.props;
        return (
            <div>
                <Link to={`${post.category}/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>
                <p>author: {post.author}</p>
                <p>comments: {post.commentCount}</p>
                <p>voteScore: {post.voteScore}</p>
                {showBody?<p>body: {post.body}</p>: false}
                <p>date: {new Date(post.timestamp).toString()}</p>
                <button onClick={() => this.like(post)}
                        className="glyphicon glyphicon-thumbs-up"></button>
                <button onClick={() => this.dislike(post)}
                        className="glyphicon glyphicon-thumbs-down"></button>
                <Link to={`/posts/edit/${post.id}`}>
                    <button className="glyphicon glyphicon-pencil"></button>
                </Link>
                <button className="glyphicon glyphicon-trash" onClick={() => this.props.showModal(post)}>
                </button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        likePost: (post) => dispatch(likePost(post)),
        dislikePost: (post) => dispatch(dislikePost(post)),
    }
}

export default connect(null, mapDispatchToProps)(PostComponent);