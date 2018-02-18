import React from 'react';
import {Col} from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import {connect} from 'react-redux';
import {createComment} from './Action';


class CreateCommentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
            author: '',
            parentId: this.props.postId,
            errorOnAuthor: null,
            errorOnBody: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        var returnIt = false;

        if(this.state.body === ''){
            returnIt = true;
            this.setState({errorOnBody: 'error'});
        } else {
            this.setState({errorOnBody: null});
        }

        if(this.state.author === ''){
            returnIt = true;
            this.setState({errorOnAuthor: 'error'});
        } else {
            this.setState({errorOnAuthor: null});
        }

        if(returnIt){
            return;
        }

        this.props.postComment(this.state);

        this.setState({body: '', author: ''});

    }

    render() {
        return (
            <div>
                <Col md={8} mdOffset={2}>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup  validationState={this.state.errorOnAuthor}>
                        <ControlLabel>Author</ControlLabel>
                        <FormControl type="text" name="author" placeholder="Write the author name"
                                     onChange={this.handleInputChange} value={this.state.author}/>
                    </FormGroup>
                    <FormGroup controlId="formControlsTextarea" validationState={this.state.errorOnBody}>
                        <ControlLabel>Comment</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="Write your comment here"
                                     name="body" onChange={this.handleInputChange} value={this.state.body}/>
                    </FormGroup>
                    <Button type="submit" bsStyle="primary">Create</Button>
                </form>
                </Col>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        postComment: (comment) => dispatch(createComment(comment)),
    };
}

export default connect(null, mapDispatchToProps)(CreateCommentComponent);
