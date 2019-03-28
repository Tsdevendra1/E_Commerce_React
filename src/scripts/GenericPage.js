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
            let clickers = [
                {
                    capsuleElementInfo: '.nav-bar',
                    clickTargetInfo: '#home-main-nav',
                    activeStateIndicator: 'desktop-nav-button-active',
                },
                {
                    capsuleElementInfo: '#sortselector',
                    clickTargetInfo: '#sortselectorclick',
                    activeStateIndicator: 'selected-option-active',
                },
                {
                    capsuleElementInfo: '#categoryselector',
                    clickTargetInfo: '#categoryselectorclick',
                    activeStateIndicator: 'selected-option-active',
                },
                {
                    capsuleElementInfo: '.nav-bar',
                    clickTargetInfo: '#show-mobile-button',
                    activeStateIndicator: 'show-mobile-active',
                },

            ];

            for (let clicker of clickers) {
                let alsoClickOutsideElement = false;
                for (let clicker of clickers) {
                    let clickTarget = document.querySelector(clicker.clickTargetInfo);
                    if (clickTarget){
                        if (event.target === clickTarget || clickTarget.parentElement.contains(event.target)) {
                            alsoClickOutsideElement = true;
                            break
                        }
                    }
                }
                console.log(alsoClickOutsideElement);
                clickAnywhereToClose(clicker.capsuleElementInfo, clicker.clickTargetInfo, clicker.activeStateIndicator, event, alsoClickOutsideElement);
            }
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

