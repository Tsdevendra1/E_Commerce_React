import React from 'react';
import NavBar from './NavBar'
import Footer from "./Footer";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getAccessToken, setRefreshToken} from "./Redux/actions/tokenActions";
import {withRouter} from 'react-router-dom'
import clickAnywhereToClose from './clickAnywhereToCloseFunction';

class GenericPage extends React.Component {

    componentDidMount() {
        this.props.loadUserFromToken();
        window.addEventListener('click', event => {
            clickAnywhereToClose('.nav-bar', '#home-main-nav','desktop-nav-button-active', event);
            clickAnywhereToClose('#sortselector', '#sortselectorclick','selected-option-active', event);
            clickAnywhereToClose('#categoryselector', '#categoryselectorclick','selected-option-active', event);
            clickAnywhereToClose('.nav-bar', '#show-mobile-button','show-mobile-active', event);
        })
    }

    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <div id="overlay"></div>
                <div className="top-margin-for-nav">
                    {this.props.children}
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

GenericPage.propTypes = {
    loadUserFromToken: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,

};


const mapDispatchToProps = dispatch => {
    return {
        // On first load see if previous refresh token exists
        loadUserFromToken: () => {
            let refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken || refreshToken === '') {//if there is no token, dont bother
                return;
            }

            //fetch user from token (if server deems it's valid token)
            dispatch(getAccessToken(refreshToken));
        },
    }
};


export default withRouter(connect(null, mapDispatchToProps)(GenericPage))

