import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {Col} from 'react-bootstrap';
import Category from './Category/CategoryComponent';
import Comment from './Comment/CommentComponent';
import CreateEditPostComponent from './Post/CreateEditPostComponent';
import CreateEditCommentComponent from './Comment/CreateEditCommentComponent';
import {loadCategories} from './Category/Action';
import {loadPosts, likePost, dislikePost, deletePost, orderBy} from './Post/Action';
import {withRouter} from 'react-router';
import Menu from './Menu/MenuComponent';
import SortButtons from './SortButtons/SortButtonsComponent';


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

    orderByDate = () => {
        this.props.orderBy('timestamp');
    }

    orderByVotes = () => {
        this.props.orderBy('voteScore');
    }

    render() {
        return (
            <div className="App">
                <Menu categories={this.props.categoryReducer.categories}/>

                <Switch>
                    <Route exact path="/posts/edit/:postId" render={({location, history, match}) => (
                        <CreateEditPostComponent pageTitle="Edit Post"
                                                 postId={match.params.postId} history={history}/>
                    )}/>
                    <Route exact path="/posts/create" render={({history}) => (
                        <CreateEditPostComponent pageTitle="Create Post" history={history}/>
                    )}/>
                    <Route exact path="/comments/edit/:commentId" render={({location, history, match}) => (
                        <CreateEditCommentComponent pageTitle="Edit Comment"
                                                    commentId={match.params.commentId} history={history}/>
                    )}/>
                    <Route exact path="/comments/create" render={({history}) => (
                        <CreateEditCommentComponent pageTitle="Create Comment" history={history}/>
                    )}/>
                    <Route exact path="/:category/:postId" render={({match}) => (
                        <div>
                            <row>
                                <Category
                                    like={this.like}
                                    dislike={this.dislike}
                                    categories={[this.props.categoryReducer.categories.find(category => category.name === match.params.category)]}
                                    posts={this.props.postReducer.posts
                                        .filter(post => post.deleted === false)
                                        .filter(post => post.id === match.params.postId)}
                                    delete={this.delete}
                                />
                            </row>
                            <Col md={8} mdOffset={2}>
                                <Comment postId={match.params.postId}/>
                            </Col>
                        </div>
                    )}/>
                    <Route exact path="/:category" render={({match}) => (
                        <div>
                            <SortButtons orderByDate={this.orderByDate} orderByVotes={this.orderByVotes}/>
                            <Category
                                like={this.like}
                                dislike={this.dislike}
                                categories={[this.props.categoryReducer.categories.find(category => category.name === match.params.category)]}
                                posts={this.props.postReducer.posts
                                    .filter(post => post.deleted === false)
                                    .filter(post => post.category === match.params.category)}
                                delete={this.delete}
                            />
                        </div>
                    )}/>
                    <Route exact path="/" render={() => (
                        <div>
                            <SortButtons orderByDate={this.orderByDate} orderByVotes={this.orderByVotes}/>
                            <Category
                                like={this.like}
                                dislike={this.dislike}
                                categories={this.props.categoryReducer.categories}
                                posts={this.props.postReducer.posts.filter(post => post.deleted === false)}
                                delete={this.delete}
                            />
                        </div>
                    )}/>
                </Switch>
            </div>
        );
    }
}

function mapStateToProps({categoryReducer, postReducer}) {
    if (postReducer.posts) {
        postReducer.posts = postReducer.posts.slice().sort(sortByField(postReducer.sortBy))
    }

    return {categoryReducer, postReducer};
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(loadCategories()),
        getPosts: () => dispatch(loadPosts()),
        likePost: (post) => dispatch(likePost(post)),
        dislikePost: (post) => dispatch(dislikePost(post)),
        deletePost: (post) => dispatch(deletePost(post)),
        orderBy: (field) => dispatch(orderBy(field))
    };
}

function sortByField(field) {
    console.log(field === 'timestamp');
    if (field === 'timestamp') {
        return (post1, post2) => post1[field] - post2[field];
    } else {
        return (post1, post2) => post2[field] - post1[field];
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
