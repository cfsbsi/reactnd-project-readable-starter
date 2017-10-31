import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Category from './Category/CategoryComponent'
import {loadCategories} from './Category/Action'



class App extends Component {

    componentDidMount() {
        this.props.getCategories()
    }

    render() {
        return (
            <div className="App">
                <Route exact path="/" render={() => (
                    <Category categories={this.props.categories}/>
                )}/>
            </div>
        );
    }
}

function mapStateToProps({categories}) {
    return {
        categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(loadCategories()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
