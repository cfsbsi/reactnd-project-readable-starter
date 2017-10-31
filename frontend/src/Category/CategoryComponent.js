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

                            </Panel>
                        </Col>
                    </div>
                ))}
            </div>
        )
    }
}

export default CategoryComponent