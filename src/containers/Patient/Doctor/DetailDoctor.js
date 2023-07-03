import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            DetailDoctor: {}
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let response = await userService.getDetailInfoDoctor(id);
            if (response && response.errCode === 0) {
                this.setState({
                    DetailDoctor: response.data
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { DetailDoctor } = this.state
        let { language } = this.props;
        let nameVi = '', nameEn = '';
        if (DetailDoctor && DetailDoctor.positionData) {
            nameVi = `${DetailDoctor.positionData.valueVi}, ${DetailDoctor.firstName} ${DetailDoctor.lastName}`;
            nameEn = `${DetailDoctor.positionData.valueEn}, ${DetailDoctor.firstName} ${DetailDoctor.lastName}`;
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ background: `url(${DetailDoctor.image})` }} >
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {DetailDoctor.Markdown && DetailDoctor.Markdown.description
                                    && <span>
                                        {DetailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>

                        </div>

                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className='detail-info-doctor'>
                        {DetailDoctor && DetailDoctor.Markdown && DetailDoctor.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: DetailDoctor.Markdown.contentHTML }}>

                            </div>
                        }
                    </div>
                    <div className='comment-doctor'>

                    </div>
                </div >
            </>

        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);