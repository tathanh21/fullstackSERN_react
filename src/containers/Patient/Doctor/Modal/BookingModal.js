import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal, Toast } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import userService from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
        }
    }
    async componentDidMount() {
        this.props.getGenders();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            if (this.props.genders.length > 0) {
                this.setState({
                    genders: this.buildDataGender(this.props.genders)
                })
            }

        }
        if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {

            if (this.props.dataScheduleTimeModal && !_.isEmpty(this.props.dataScheduleTimeModal)) {
                let doctorId = this.props.dataScheduleTimeModal.doctorId;
                let timeType = this.props.dataScheduleTimeModal.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state }
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedGender: selectedOption });

    }

    buildTimeBooking = (dataScheduleTimeModal) => {
        let { language } = this.props
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let time = language === LANGUAGES.VI ? dataScheduleTimeModal.timeTypeData.valueVi : dataScheduleTimeModal.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ? moment.unix(+dataScheduleTimeModal.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataScheduleTimeModal.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return `${time} - ${date}`

        }
        return <></>
    }
    buidDoctorName = (dataScheduleTimeModal) => {
        let { language } = this.props;
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let name = language === LANGUAGES.VI ? `${dataScheduleTimeModal.doctorData.lastName} ${dataScheduleTimeModal.doctorData.firstName}` :
                `${dataScheduleTimeModal.doctorData.firstName} ${dataScheduleTimeModal.doctorData.lastName}`;
            return name;
        }
        return <></>
    }
    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal);
        let doctorName = this.buidDoctorName(this.props.dataScheduleTimeModal);
        let res = await userService.postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment success!')
            this.props.closeBookingModal()
        } else {
            toast.error('Booking a new appointment error!')
        }
        // console.log(this.state)
    }
    render() {
        let isOpenModal = this.props.isOpenModal;
        let closeBookingModal = this.props.closeBookingModal
        let dataScheduleTimeModal = this.props.dataScheduleTimeModal
        let doctorId = '';
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            doctorId = dataScheduleTimeModal.doctorId
        }
        // console.log('check ', dataScheduleTimeModal)
        return (
            <Modal isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg' centered
                backdrop={true}>
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id={"patient.booking-modal.title"} /></span>
                        <span onClick={closeBookingModal} className='right'><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body container'>
                        {/* {JSON.stringify(dataScheduleTimeModal)} */}
                        <div className='doctor-info'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescription={false}
                                dataScheduleTimeModal={dataScheduleTimeModal}
                            />
                        </div>
                        <div className='price'>

                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id={"patient.booking-modal.fullName"} /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id={"patient.booking-modal.phoneNumber"} /></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id={"patient.booking-modal.email"} /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id={"patient.booking-modal.address"} /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id={"patient.booking-modal.reason"} /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id={"patient.booking-modal.birthday"} /></label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.birthday}
                                // minDate={yesterday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id={"patient.booking-modal.gender"} /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                    className='form-control'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm' onClick={() => this.handleConfirmBooking()}><FormattedMessage id={"patient.booking-modal.btnConfirm"} /></button>
                        <button onClick={closeBookingModal} className='btn-booking-cancel'><FormattedMessage id={"patient.booking-modal.cancel"} /></button>
                    </div>
                </div>
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
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
