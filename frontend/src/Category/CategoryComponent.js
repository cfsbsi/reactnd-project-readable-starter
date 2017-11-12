import React from 'react'
import {Link} from 'react-router-dom'
import {Panel, Col} from 'react-bootstrap';
import Confirmation from '../Confirmation/ConfirmationComponent'

class CategoryComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            postToDelete: null
        };
    }

    containsCategories = (categories)  => {
        if(categories && categories.length > 0 && categories[0] !== undefined){
            return true;
        }
        return false;
    }

    showModal = (post) => {
        this.setState({showModal: true, postToDelete: post});
    }

    hideModal = () => {
        this.setState({showModal: false});
    }

    delete = () => {
        console.log(this.state.postToDelete);
        this.props.delete(this.state.postToDelete);
        this.hideModal();
    }

    render() {
        return this.containsCategories(this.props.categories)?(
            <div>
                {this.props.categories && this.props.categories.map((category, index) => (
                    <div key={index}>
                        <Col md={8} mdOffset={2}>
                            <Panel header={category.name}>
                                {this.props.posts &&
                                this.props.posts.length > 0 &&
                                this.props.posts.filter((post) => post.category === category.name)
                                    .map((post, index) => (
                                    <div key={index}>
                                        <Link to={`${post.category}/${post.id}`}>
                                            <h3>{post.title}</h3>
                                        </Link>
                                        <span onClick={() => this.props.like(post)} className="glyphicon glyphicon-thumbs-up"></span>
                                        <span onClick={() => this.props.dislike(post)} className="glyphicon glyphicon-thumbs-down"></span>
                                        <p>author: {post.author}</p>
                                        <p>comments: {post.commentCount}</p>
                                        <p>voteScore: {post.voteScore}</p>
                                        <Link to={`/posts/edit/${post.id}`}>
                                            <button className="btn btn-default">edit</button>
                                        </Link>
                                        <button className="btn btn-default" onClick={() => this.showModal(post)}>
                                            delete
                                        </button>
                                    </div>
                                ))}
                            </Panel>
                        </Col>
                    </div>
                ))}
                <Confirmation show={this.state.showModal}
                              title="Deleting Post"
                              confirmation="Are you sure you want to delete this?"
                              proceed={() => this.delete()}
                              cancel={this.hideModal}
                              okLabbel="Yes"
                              dismiss={() => this.hideModal()}
                />
            </div>
        ):(
            <div>
                <h1>Category not found!</h1>
            </div>
        )
    }
}

export default CategoryComponent