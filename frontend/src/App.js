import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Category from './Category/CategoryComponent'
import Post from './Post/PostComponent'
import CreateEditPostComponent from './Post/CreateEditPostComponent'
import {loadCategories} from './Category/Action'
import {loadPosts, likePost, dislikePost} from './Post/Action'
import { withRouter } from 'react-router'


class App extends Component {

    componentDidMount() {
        this.props.getCategories();
        this.props.getPosts();
    }

    like = (post) => {
        this.props.likePost(post);
    }

    dislike = (post) => {
        this.props.dislikePost(post);
    }

    render() {
        return (
            <div className="App">
                <Route exact path="/" render={() => (
                    <Category
                        like={this.like}
                        dislike={this.dislike}
                        categories={this.props.categoryReducer.categories}
                        posts={this.props.postReducer.posts}
                    />
                )}/>
                <Route exact path="/posts/edit/:postId" component={CreateEditPostComponent}/>
                <Route exact path="/posts/create" component={CreateEditPostComponent}/>
                <Route exact path="/:category/:postId" component={Post}/>
            </div>
        );
    }
}

function mapStateToProps({categoryReducer, postReducer}) {
    return {categoryReducer, postReducer};
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(loadCategories()),
        getPosts: () => dispatch(loadPosts()),
        likePost: (postId) => dispatch(likePost(postId)),
        dislikePost: (postId) => dispatch(dislikePost(postId))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
