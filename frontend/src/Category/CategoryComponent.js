import React from 'react'
import {Panel, Col} from 'react-bootstrap';
import Confirmation from '../Confirmation/ConfirmationComponent'
import Post from '../Post/PostComponent'

class CategoryComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            postToDelete: null
        };
    }

    containsCategories = (categories) => {
        if (categories && categories.length > 0 && categories[0] !== undefined) {
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
        this.props.delete(this.state.postToDelete);
        this.hideModal();
    }

    render() {
        return this.containsCategories(this.props.categories) ? (
            <div>
                <div>
                    <Col md={8} mdOffset={2}>
                        <Panel header="Posts">
                            {this.props.posts &&
                            this.props.posts.length > 0 &&
                            this.props.posts.map((post, index) => (
                                <div key={index}>
                                    <Post post={post} showBody={this.props.showPostBody} showModal={this.showModal}/>
                                </div>
                            ))}
                        </Panel>
                    </Col>
                </div>
                <Confirmation show={this.state.showModal}
                              title="Deleting Post"
                              confirmation="Are you sure you want to delete this?"
                              proceed={() => this.delete()}
                              cancel={this.hideModal}
                              okLabbel="Yes"
                              dismiss={() => this.hideModal()}
                />
            </div>
        ) : (
            <div>
                <h1>Category not found!</h1>
            </div>
        )
    }
}

export default CategoryComponent