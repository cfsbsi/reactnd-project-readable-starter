import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Category from './Category/CategoryComponent'
import {loadCategories} from './Category/Action'
import {loadPosts} from './Post/Action'


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

export default connect(mapStateToProps, mapDispatchToProps)(App);
