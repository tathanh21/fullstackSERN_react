import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    async componentDidMount() {

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }


    render() {
        let isOpenModal = this.props.isOpenModal;
        let closeBookingModal = this.props.closeBookingModal
        let dataScheduleTimeModal = this.props.dataScheduleTimeModal

        return (
            <Modal isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg' centered
                backdrop={true}>
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
                        <span onClick={closeBookingModal} className='right'><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body container'>
                        {/* {JSON.stringify(dataScheduleTimeModal)} */}
                        <div className='doctor-info'>

                        </div>
                        <div className='price'>

                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Ho ten</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Dia chi email</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Dia chi lien he</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Ly do kham</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>dat cho ai</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Gioi tinh</label>
                                <input className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'>Xác Nhận</button>
                        <button onClick={closeBookingModal} className='btn-booking-cancel'>Hủy</button>
                    </div>
                </div>
            </Modal>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
