import React from 'react';
import Logo from "./Logo";
import {Link} from 'react-router-dom';
import routes from './routers';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.showDesktopLinks = this.showDesktopLinks.bind(this);
        this.closeMainTab = this.closeMainTab.bind(this);
        this.createDesktopNavItem = this.createDesktopNavItem.bind(this);
    }

    handleClick(e) {
        // Add active class when pressed
        e.target.classList.toggle('show-mobile-active');
        e.target.classList.toggle('fa-times');
        e.target.classList.toggle('fa-bars');

        // Function which expands and contracts the mobile nav
        let mobileNavLinks = document.getElementsByClassName('mobile-nav-links')[0];
        let mobileHeightMarker = document.getElementById('mobile-height-marker');
        if (mobileNavLinks.clientHeight === 0) {
            mobileNavLinks.style.height = `${mobileHeightMarker.clientHeight}px`;
        } else {
            mobileNavLinks.style.height = `0px`;
        }
    }

    showDesktopLinks(e) {
        e.target.classList.toggle('desktop-nav-button-active');
        let navContentElement = document.getElementsByClassName('nav-content')[0];
        navContentElement.classList.toggle('nav-border-bottom');
        let desktopNavLinks = document.getElementsByClassName('desktop-nav-links')[0];
        if (desktopNavLinks.style.display === 'none') {
            desktopNavLinks.style.display = 'block';
        } else {
            desktopNavLinks.style.display = 'none';
        }

    }

    closeMainTab(e) {
        let parentNav = document.getElementById(e.currentTarget.getAttribute('data-main-nav'));
        parentNav.click();
    }


    createDesktopNavItem(navItem, parentNavId) {
        return (
            <div key={navItem.name} className="desktop-nav-item"><Link data-main-nav={parentNavId}
                                                                       onClick={this.closeMainTab}
                                                                       to={navItem.path}>{navItem.name}</Link></div>
        )
    };

    render() {
        let createMobileNavItem = function (navItem) {
            let className = 'mobile-nav-bar-item';
            return (
                <div key={`${navItem.type}-mobile`} className="row mobile-nav-row"
                     style={{margin: 0, paddingBottom: '1rem', paddingTop: '1rem'}}>
                    <div className="col mobile-link-flex">
                        <a className={className} href={navItem.url}>{navItem.type}</a>
                        <div className="mobile-nav-bar-item">
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
            )
        };

        return (
            <div className="nav-bar">
                <div className="nav-content nav-border-bottom">
                    <div className="nav-left-content">
                        <Logo/>
                        <div className="desktop-nav-button-group">
                            <a id="home-main-nav" onClick={this.showDesktopLinks}
                               className="desktop-show desktop-nav-button">HOME</a>
                        </div>
                    </div>
                    <div className="nav-right-content">
                        <i id="show-mobile-button" onClick={this.handleClick} className="mobile-show fas fa-bars"></i>
                        <div className="center-vertical desktop-show">
                            <input type="text" placeholder="Search.." name="search" className="search-bar"/>
                            <button type="submit" className="search-bar-button"><i className="fa fa-search"></i>
                            </button>
                            <i className="fas fa-shopping-basket desktop-show"></i>
                        </div>
                    </div>
                </div>
                <div className="mobile-nav-links mobile-show">
                    <div id="mobile-height-marker">
                        {/*{this.props.navs.map((navItem) => {*/}
                            {/*return createMobileNavItem(navItem)*/}
                        {/*})}*/}
                    </div>
                </div>
                <div className="desktop-nav-links desktop-show" style={{'display': 'none'}}>
                    <div className="desktop-navs-container">
                        {routes.routes.map(navItem => {
                            return this.createDesktopNavItem(navItem, 'home-main-nav')
                        })}
                    </div>
                </div>
            </div>
        )
    }

}

