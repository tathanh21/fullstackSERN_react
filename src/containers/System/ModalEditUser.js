import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
        console.log('dis mount edit modal', this.props.currentUser)
    }
    toggle = () => {
        this.props.toggerFromParent()
    }
    handleOnchangInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check good state:', this.state)
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter:' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            // call api edit modal
            this.props.editUser(this.state);

        }
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'modal-user-container'} size='lg' centered>
                <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
                <ModalBody >
                    <div className='modal-user-body'>
                        <div className='input-contaniner'>
                            <label>Email</label>
                            <input type='text' onChange={(event) => { this.handleOnchangInput(event, "email") }} value={this.state.email} disabled />
                        </div>
                        <div className='input-contaniner'>
                            <label>Password</label>
                            <input type='password' onChange={(event) => { this.handleOnchangInput(event, "password") }} value={this.state.password} disabled />
                        </div>
                        <div className='input-contaniner'>
                            <label>First Name</label>
                            <input type='text' onChange={(event) => { this.handleOnchangInput(event, "firstName") }} value={this.state.firstName} />
                        </div>
                        <div className='input-contaniner'>
                            <label>Last Name</label>
                            <input type='text' onChange={(event) => { this.handleOnchangInput(event, "lastName") }} value={this.state.lastName} />
                        </div>
                        <div className='input-contaniner max-width-input'>
                            <label>Address </label>
                            <input type='text' onChange={(event) => { this.handleOnchangInput(event, "address") }} value={this.state.address} />
                        </div>
                        {/* <div className='input-contaniner max-width-input'>
                            <label>Phone Number</label>
                            <input type='text' onChange={(event) => { this.handleOnchangInput(event, "number") }} value={this.state.number} />
                        </div>
                        <div className='input-contaniner max-width-input'>
                            <label>Gender</label>
                            <input type='text' onChange={(event) => { this.handleOnchangInput(event, "gender") }} value={this.state.gender} />
                        </div> */}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>
                        Save Changes
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
