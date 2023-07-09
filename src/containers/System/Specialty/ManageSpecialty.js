import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import userService from '../../../services/userService';
import { toast } from "react-toastify"

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }
    async componentDidMount() {

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.toBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleSaveNewSpecialty = async () => {
        let res = await userService.createNewSpecialty(this.state);
        if (res && res.errCode === 0) {
            toast.success('Add new specialty success')
        } else {
            toast.error('Something wrong...')
        }
    }
    render() {

        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quan ly chuyen khoa</div>
                <div className='btn-add-new-specialty'>
                </div>
                <div className='all-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Ten Chuyen Khoa</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Anh Chuyen Khoa</label>
                        <br></br>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                    </div>
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.descriptionMarkdown}
                    />
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={() => this.handleSaveNewSpecialty()}
                        >Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
