import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Category from './Category/CategoryComponent'
import Post from './Post/PostComponent'
import CreateEditPostComponent from './Post/CreateEditPostComponent'
import {loadCategories} from './Category/Action'
import {loadPosts, likePost, dislikePost, deletePost} from './Post/Action'
import {withRouter} from 'react-router'


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

    delete = (post) => {
        this.props.deletePost(post);
    }

    render() {
        return (
            <div className="App">
                <Route exact path="/" render={() => (
                    <Category
                        like={this.like}
                        dislike={this.dislike}
                        categories={this.props.categoryReducer.categories}
                        posts={this.props.postReducer.posts.filter(post => post.deleted === false)}
                        delete={this.delete}
                    />
                )}/>
                <Route exact path="/posts/edit/:postId" component={CreateEditPostComponent}/>
                <Route exact path="/posts/create" component={CreateEditPostComponent}/>
                <Route exact path="/:category/:postId" component={Post}/>
                <Route exact path="/:category" render={({match}) => (
                    <Category
                        like={this.like}
                        dislike={this.dislike}
                        categories={[this.props.categoryReducer.categories.find(category => category.name === match.params.category)]}
                        posts={this.props.postReducer.posts
                            .filter(post => post.deleted === false)
                            .filter(post => post.category === match.params.category)}
                        delete={this.delete}
                    />
                )}/>
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
        likePost: (post) => dispatch(likePost(post)),
        dislikePost: (post) => dispatch(dislikePost(post)),
        deletePost: (post) => dispatch(deletePost(post)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
