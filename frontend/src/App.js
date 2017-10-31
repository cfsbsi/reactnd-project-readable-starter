import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Panel, Col} from 'react-bootstrap';
import {Route, Link} from 'react-router-dom';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Route exact path="/" render={() => (
                    <Col md="8" mdOffset="2">
                        <Panel header="Redux">
                            <ListGroup>
                                <ListGroupItem>Link 1</ListGroupItem>
                                <ListGroupItem>Link 2</ListGroupItem>
                            </ListGroup>
                        </Panel>
                    </Col>
                )}/>
            </div>
        );
    }
}

export default App;
