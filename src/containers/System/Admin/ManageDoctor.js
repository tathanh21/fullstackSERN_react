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

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMaskdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: ''
        }
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMaskdown: text,
            contentHTML: html,
        })
        console.log('handleEditorChange', html, text);

    }
    handleSaveContentMarkdown = () => {
        console.log('hoi dan it', this.state)
    }
    handleChange = selectedDoctor => {
        this.setState({ selectedDoctor });
        console.log(`Option selected`, selectedDoctor)
    }
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>Tạo thêm thông tin doctor</div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label>Chọn Bác Sĩ</label>
                        <Select
                            defaultValue={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={options}
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
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className='save-content-doctor'>
                    Lưu Thông Tin
                </button>
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
