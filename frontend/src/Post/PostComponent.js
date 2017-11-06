import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

class PostComponent extends React.Component {

    render() {
        const selectedPost = this.props.postReducer.posts.find((post) => post.id === this.props.match.params.postId)
        const foundPost = selectedPost && selectedPost.category ===  this.props.match.params.category;
        return foundPost ? (
            <div>
                <h2>Category: {selectedPost && selectedPost.category}</h2>
                <h3>Post: {selectedPost && selectedPost.title}</h3>
                <p>author: {selectedPost && selectedPost.author}</p>
                <p>created at: {selectedPost && ((new Date(selectedPost.timestamp)) + '')}</p>
                <p>comments: {selectedPost && selectedPost.commentCount}</p>
                <p>vote score: {selectedPost && selectedPost.voteScore}</p>
                <h4>{selectedPost && selectedPost.body}</h4>
            </div>
        ) : (
            <div>
                <h2>Post not found!</h2>
                <Link to='/posts/create'>Create Post</Link>
            </div>
        )
    }
}
function mapStateToProps({postReducer}) {
    return {postReducer}
}
export default connect(mapStateToProps)(PostComponent);
