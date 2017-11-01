import React from 'react'

import {Panel, Col} from 'react-bootstrap';

class CategoryComponent extends React.Component {
    render() {
        return (
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
                                        <h3>{post.title}</h3>
                                    </div>
                                ))}
                            </Panel>
                        </Col>
                    </div>
                ))}
            </div>
        )
    }
}

export default CategoryComponent