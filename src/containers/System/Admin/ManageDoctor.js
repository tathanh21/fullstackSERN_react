import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTION, LANGUAGES } from '../../../utils';
import userService from '../../../services/userService';
import { inRange } from 'lodash';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markDown
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctor: [],
            hasOldData: false,

            // save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.getRequiredDoctorInfo();
    }
    buidDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.firstName} ${item.lastName}`
                    let labelEn = `${item.lastName} ${item.firstName}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} `
                    let labelEn = `${item.valueEn} USD`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buidDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buidDataInputSelect(this.props.allDoctors, 'USERS')
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.buidDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buidDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buidDataInputSelect(resProvince, 'PROVINCE')

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfo
            let dataSelectPrice = this.buidDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buidDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buidDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectSpecialty = this.buidDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buidDataInputSelect(resClinic, 'CLINIC')
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })

        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })


    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        // console.log('check state', this.state)
        // return
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedPayment: this.state.selectedPayment.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        })
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;
        let response = await userService.getDetailInfoDoctor(selectedDoctor.value);
        if (response && response.errCode === 0 && response.data && response.data.Markdown) {
            let markdown = response.data.Markdown;
            let addressClinic = '', nameClinic = '', note = '', paymentId = '', priceId = '', provinceId = '', specialtyId = '', clinicId = '',
                selectedPayment, selectedPrice, selectedProvince, selectedSpecialty, selectedClinic;

            if (response.data.Doctor_Info) {
                addressClinic = response.data.Doctor_Info.addressClinic;
                nameClinic = response.data.Doctor_Info.nameClinic;
                note = response.data.Doctor_Info.note;


                paymentId = response.data.Doctor_Info.paymentId;
                priceId = response.data.Doctor_Info.priceId;
                provinceId = response.data.Doctor_Info.provinceId;
                specialtyId = response.data.Doctor_Info.specialtyId;
                clinicId = response.data.Doctor_Info.clinicId;

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''
            })
        }
    }
    handleChangeSelectDoctorInfo = async (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedDoctor;
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }
    render() {
        let { hasOldData } = this.state;

        return (
            <div className='manage-doctor-container container'>
                <div className='manage-doctor-title'><FormattedMessage id="admin.manage-doctor" /></div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label><FormattedMessage id="admin.select-doctor" /></label>
                        <Select
                            defaultValue={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            className='form-control'
                            placeholder={<FormattedMessage id="admin.select-doctor" />}
                        />

                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="admin.intro" /></label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPrice}
                            className='form-control'
                            placeholder={<FormattedMessage id="admin.price" />}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPayment}
                            className='form-control'
                            placeholder={<FormattedMessage id="admin.payment" />}
                            name='selectedPayment'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listProvince}
                            className='form-control'
                            placeholder={<FormattedMessage id="admin.province" />}
                            name='selectedProvince'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.nameClinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.addressClinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.note" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listSpecialty}
                            className='form-control'
                            placeholder={<FormattedMessage id="admin.specialty" />}
                            name='selectedSpecialty'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.select-clinic" /> </label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listClinic}
                            className='form-control'
                            placeholder={<FormattedMessage id="admin.select-clinic" />}
                            name='selectedClinic'
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'> </div>
                <br />
                <MdEditor style={{ height: '300px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.contentMarkdown}
                />

                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor' : "create-content-doctor"}>
                    {hasOldData === true ? <span><FormattedMessage id="admin.save" /></span> : <span><FormattedMessage id="admin.add" /></span>}
                </button>
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctors(data))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
