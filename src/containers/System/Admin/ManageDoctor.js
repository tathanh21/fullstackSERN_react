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
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctor: [],
            hasOldData: false
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
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
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buidDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buidDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
        console.log('handleEditorChange', html, text);

    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE
        })
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let response = await userService.getDetailInfoDoctor(selectedDoctor.value);
        if (response && response.errCode === 0 && response.data && response.data.Markdown) {
            let markdown = response.data.Markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    }
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        let { hasOldData } = this.state
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>Tạo thêm thông tin doctor</div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label>Chọn Bác Sĩ</label>
                        <Select
                            defaultValue={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            className='form-control'
                        />

                    </div>
                    <div className='content-right'>
                        <label>Thông Tin Giới Thiêu</label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'> </div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange}
                    value={this.state.contentMarkdown}
                />
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor' : "create-content-doctor"}>
                    {hasOldData === true ? <span>Lưu Thông Tin</span> : <span>Tạo Thông Tin</span>}
                </button>
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctors(data))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
