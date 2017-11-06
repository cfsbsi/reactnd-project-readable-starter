import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Category from './Category/CategoryComponent'
import Post from './Post/PostComponent'
import CreateEditPostComponent from './Post/CreateEditPostComponent'
import {loadCategories} from './Category/Action'
import {loadPosts} from './Post/Action'
import { withRouter } from 'react-router'


class App extends Component {

    componentDidMount() {
        this.props.getCategories();
        this.props.getPosts();
    }

    render() {
        return (
            <div className="App">
                <Route exact path="/" render={() => (
                    <Category
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
        getPosts: () => dispatch(loadPosts())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
