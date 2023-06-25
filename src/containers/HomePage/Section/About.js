import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>Truyền thông nói về BookingCare</div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/nPsz2ggTAkk" title="Heart of a Lio: The amazing animated short film by Gatorade" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>Futbol Club Barcelona (phát âm tiếng Catalunya: [fubˈbɔl ˈklub bəɾsəˈlonə] (nghe)), thường được biết đến với tên gọi tắt Barcelona, hay đơn giản là Barça ([ˈbaɾsə]), là một câu lạc bộ bóng đá chuyên nghiệp có trụ sở tại Barcelona, Catalunya, Tây Ban Nha, thi đấu tại La Liga, giải đấu hàng đầu của bóng đá Tây Ban Nha.</p>
                    </div>
                </div>

            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
