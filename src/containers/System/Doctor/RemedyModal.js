import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import moment from 'moment';
import { LANGUAGES, CRUD_ACTION, CommonUtils } from '../../../utils'

class RemedyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imgBase64: ''
        }
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.toBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    sendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    render() {
        let isOpenModal = this.props.isOpenModal;
        let { dataModal, closeRemedyModal, sendRemedy } = this.props;
        console.log(this.props)
        let dataScheduleTimeModal = this.props.dataScheduleTimeModal

        // console.log('check ', dataScheduleTimeModal)
        return (
            <Modal isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='md' centered
                backdrop={true}>
                <ModalHeader>Gửi hóa đơn khám bệnh</ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <div className='form-control'>
                                <label>Email benh nha</label>
                                <input type='email' value={this.state.email}
                                    onChange={(event) => this.handleOnChangeEmail(event)}
                                />
                            </div>
                        </div>
                        <div className='col-6 form-group'>
                            <div className='form-control'>
                                <label>Chon file don thuoc</label>
                                <input className='form-control-file' type='file'
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.sendRemedy()}>
                        Do Something
                    </Button>
                    <Button color="secondary" onClick={closeRemedyModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
