import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import { confirmable } from 'react-confirm';

class ConfirmationComponent extends React.Component {
    render() {

        const {
            okLabbel = 'OK',
            cancelLabel = 'Cancel',
            title,
            confirmation,
            show,
            proceed,
            dismiss,
            cancel,
            enableEscape = true,
        } = this.props;
        return (
            <div className="static-modal">
                <Modal show={show} onHide={dismiss} backdrop={enableEscape ? true : 'static'} keyboard={enableEscape}>
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {confirmation}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={cancel}>{cancelLabel}</Button>
                        <Button className='button-l' bsStyle="primary" onClick={proceed}>{okLabbel}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

ConfirmationComponent.propTypes = {
    okLabbel: PropTypes.string,
    cancelLabel: PropTypes.string,
    title: PropTypes.string,
    confirmation: PropTypes.string,
    show: PropTypes.bool,
    proceed: PropTypes.func,
    cancel: PropTypes.func,
    dismiss: PropTypes.func,
    enableEscape: PropTypes.bool,
}

export default confirmable(ConfirmationComponent);