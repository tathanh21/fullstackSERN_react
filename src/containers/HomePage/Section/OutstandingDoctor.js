import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";


class OutstadingDoctor extends Component {

    render() {

        return (
            <div className='section-share outstading-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác Sĩ Nổi Bật Tuần Qua</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstading-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giao Su, tien si</div>
                                        <div>co xuong khop</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstading-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giao Su, tien si</div>
                                        <div>co xuong khop</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstading-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giao Su, tien si</div>
                                        <div>co xuong khop</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstading-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giao Su, tien si</div>
                                        <div>co xuong khop</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstading-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giao Su, tien si</div>
                                        <div>co xuong khop</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-border'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstading-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giao Su, tien si</div>
                                        <div>co xuong khop</div>
                                    </div>
                                </div>
                            </div>

                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstadingDoctor);
