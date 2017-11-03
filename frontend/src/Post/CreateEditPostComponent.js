import React from 'react';
import {connect} from 'react-redux';
import {createPost} from './Action';
import serializeForm from 'form-serialize';

class CreateEditPostComponent extends React.Component {

    componentDidMount() {
        this.setState({pageTitle: this.getPageTitle()})
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
            category: 'react'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('event.target');
        console.log(serializeForm(event.target, {hash: true}));
        console.log(this.state);
        this.createPost(this.state)
        this.setState({
            title: '',
            author: '',
            body: '',
            category: 'react',
            id: (Math.floor((Math.random() * 1000000) + 1)).toString(),
            timestamp: new Date().getTime(),
            pageTitle: this.getPageTitle(),
        });

    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    createPost = (post) => {
        this.props.postPost(post)
    }

    getPageTitle = () => {
        if (this.props.location.pathname === '/posts/create') {
            return 'Create Post';
        } else {
            return 'Edit Post';
        }
    }

    render() {
        return (
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
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

function mapStateToProps({categoryReducer, postReducer}) {
    return {categoryReducer, postReducer}
}

function mapDispatchToProps(dispatch) {
    return {
        postPost: (post) => dispatch(createPost(post))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditPostComponent);
