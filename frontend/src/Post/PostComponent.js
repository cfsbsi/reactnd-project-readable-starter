import React from 'react';
import {Link} from 'react-router-dom'

class PostComponent extends React.Component {

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
                <button onClick={() => this.props.like(post)}
                        className="glyphicon glyphicon-thumbs-up"></button>
                <button onClick={() => this.props.dislike(post)}
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

export default PostComponent