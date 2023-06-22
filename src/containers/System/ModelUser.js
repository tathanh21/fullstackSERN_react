import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],

        }
        this.state = {

        }
    }

    componentDidMount() {
    }
    toggle = () => {
        this.props.toggerFromParent()
    }

    render() {
        console.log('check child props', this.props);
        console.log('check child open modal', this.props.isOpen);

        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'modal-user-container'} size='lg' centered>
                <ModalHeader toggle={() => { this.toggle() }}>Crate A New User</ModalHeader>
                <ModalBody >
                    <div className='modal-user-body'>
                        <div className='input-contaniner'>
                            <label>Email</label>
                            <input type='text' />
                        </div>
                        <div className='input-contaniner'>
                            <label>Password</label>
                            <input type='password' />
                        </div>
                        <div className='input-contaniner'>
                            <label>First Name</label>
                            <input type='text' />
                        </div>
                        <div className='input-contaniner'>
                            <label>Last Name</label>
                            <input type='text' />
                        </div>
                        <div className='input-contaniner max-width-input'>
                            <label>Address </label>
                            <input type='text' />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.toggle() }}>
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
