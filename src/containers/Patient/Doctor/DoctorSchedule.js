import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
// import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGES, LanguageUtils } from '../../../utils';
import { iteratee, thru, times } from 'lodash';
import userService from '../../../services/userService';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvalilableTime: []
        }
    }
    async componentDidMount() {
        let { language } = this.props;

        // console.log('moment vie', moment(new Date()).format('dddd-DD/MM'))
        // console.log('moment en', moment(new Date()).locale('en').format('ddd-DD/MM'))

        this.setArrDay(language)
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    setArrDay = (language) => {
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi)
            } else {

                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd-DD/MM')
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDays.push(object)
        }
        this.setState({
            allDays: arrDays
        })

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDay(this.props.language)
        }
    }
    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await userService.getScheduleDoctorByDate(doctorId, date);
            console.log('asdf', res)
            if (res && res.errCode == 0) {
                this.setState({
                    allAvalilableTime: res.data ? res.data : []
                })
            }
        }
    }
    render() {
        // let options = [
        //     { label: 'thu2', value: '2' },
        //     { label: 'thu3', value: '3' },
        // ]
        let { allDays, allAvalilableTime } = this.state;
        let { language } = this.props
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => { this.handleOnchangeSelect(event) }}>
                        {allDays && allDays.length > 0 && allDays.map((item, index) => {
                            return (
                                <option value={item.value} key={index}>{item.label} </option>
                            )
                        })}
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='calendar'><i class="fas fa-calendar-alt"><span>lich kham</span></i> </div>
                    <div className='time-content'>
                        {allAvalilableTime && allAvalilableTime.length > 0 ?
                            allAvalilableTime.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI ?
                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                return (
                                    <button key={index}>{timeDisplay}</button>
                                )
                            })
                            :
                            <div>Bác sĩ không có lịch hẹn trong thời gian này, Vui lòng chọn thời gian khác!</div>
                        }

                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
