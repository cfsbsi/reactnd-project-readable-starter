import React from 'react'
import {Col, Button} from 'react-bootstrap'

const SortButtonsComponent = function ({orderByDate, orderByVotes}) {
    return (
        <div>
            <Col md={8} mdOffset={2}>
                <Button onClick={() => orderByDate()}>Order by date</Button>
                <Button onClick={() => orderByVotes()}>order by votes</Button>
            </Col>
        </div>
    )
}

export default SortButtonsComponent