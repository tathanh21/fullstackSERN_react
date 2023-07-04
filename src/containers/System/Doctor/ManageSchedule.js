import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import * as actions from '../../../store/actions'

import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { times } from 'lodash';
class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: new Date(),
            rangeTime: []

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buidDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            this.setState({
                rangeTime: this.props.allScheduleTime
            })
        }
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buidDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctor: dataSelect
        //     })
        // }
    }
    buidDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.state
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });

    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <div className='manage-schedule-conatiner'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.chooseDoctor" /></label>
                            <Select
                                defaultValue={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                                className='form-control'
                            />                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.chooseDate" /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className='btn btn-schedule' key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )

                                })
                            }
                        </div>
                    </div>
                    <button className='btn btn-primary btn-save-schedule'><FormattedMessage id="manage-schedule.save" /></button>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
