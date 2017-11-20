import React from 'react'
import {Col, Button} from 'react-bootstrap'

const SortButtonsComponent = function ({orderByDate, orderByVotes}) {
    return (
        <div>
            <Col md={8} mdOffset={2}>
                <Button className="glyphicon glyphicon-calendar" onClick={() => orderByDate()}></Button>
                <Button className="glyphicon glyphicon-star" onClick={() => orderByVotes()}></Button>
            </Col>
        </div>
    )
}

export default SortButtonsComponent