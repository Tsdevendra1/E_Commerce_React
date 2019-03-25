import React from 'react';
import Logo from "./Logo";
import {Link} from 'react-router-dom';
import {routes} from './routers';
import ProductsService from "./ProductService";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileActive: false,
            desktopActive: false,
            searchResults: [],
        };
        this.handleClick = this.handleClick.bind(this);
        this.showDesktopLinks = this.showDesktopLinks.bind(this);
        this.closeMainTab = this.closeMainTab.bind(this);
        this.createDesktopNavItem = this.createDesktopNavItem.bind(this);
        this.createMobileNavItem = this.createMobileNavItem.bind(this);
        this.getSearchResults = this.getSearchResults.bind(this);
        this.toggleNavMenuWithClick = this.toggleNavMenuWithClick.bind(this);
        this.closeSearchResults = this.closeSearchResults.bind(this);
    }

    toggleNavMenuWithClick() {
        let width = document.body.clientWidth;
        if (width >= 724 && this.state.mobileActive) {
            this.closeMobileTab();
        } else if (width < 724 && this.state.desktopActive) {
            document.getElementById('home-main-nav').click();
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.toggleNavMenuWithClick);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.toggleNavMenuWithClick);
    }

    handleClick(e) {

        // Toggle mobileActive
        this.setState({mobileActive: ((!this.state.mobileActive))});

        // Add active class when pressed
        e.target.classList.toggle('show-mobile-active');
        e.target.classList.toggle('fa-times');
        e.target.classList.toggle('fa-bars');

        let overlayElement = document.getElementById('overlay');
        overlayElement.style.display = (overlayElement.style.display === 'none' || overlayElement.style.display === '') ? 'block' : 'none';

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
        // Toggle mobileActive
        this.setState({desktopActive: ((!this.state.desktopActive))});

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
        if (!navItem.show) {
            return;
        }
        return (
            <div key={navItem.name} className="desktop-nav-item"><Link data-main-nav={parentNavId}
                                                                       onClick={this.closeMainTab}
                                                                       to={navItem.path}>{navItem.name}</Link></div>
        )
    };

    closeMobileTab() {
        document.getElementById('show-mobile-button').click();
    }

    createMobileNavItem(navItem) {
        if (!navItem.show) {
            return;
        }
        let className = 'mobile-nav-bar-item';
        return (
            <div key={`${navItem.name}-mobile`} className="row mobile-nav-row"
                 style={{margin: 0, paddingBottom: '1rem', paddingTop: '1rem'}}>
                <div className="col mobile-link-flex">
                    <Link onClick={this.closeMobileTab} className={className} to={navItem.path}>{navItem.name}</Link>
                    <div className="mobile-nav-bar-item">
                        <i className="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        )
    }

    getSearchResults(e) {
        let value = e.currentTarget.value;
        if (value) {
            ProductsService.getProducts(`product_name=${value}`).then(data => {
                this.setState({searchResults: data})
            }).catch(e => {
                console.log(e.response.data);
            })
        } else {
            this.setState({searchResults: []})
        }
    }

    closeSearchResults() {
        this.setState({searchResults: []});
        document.querySelector('.search-bar').value = '';
    }

    render() {
        let addClass = function () {
            let button = document.querySelector('.search-bar-button');
            button.classList.add('button-focus');
        };
        let removeClass = function () {
            let button = document.querySelector('.search-bar-button');
            button.classList.remove('button-focus');
        };
        return (
            <div className="nav-bar">
                <div className="nav-content nav-border-bottom">
                    <div className="nav-left-content">
                        <Logo/>
                        <div className="desktop-nav-button-group">
                            <span id="home-main-nav" onClick={this.showDesktopLinks}
                                  className="desktop-show desktop-nav-button">HOME</span>
                        </div>
                    </div>
                    <div className="nav-right-content">
                        <i id="show-mobile-button" onClick={this.handleClick} className="mobile-show fas fa-bars"></i>
                        <div className="center-vertical desktop-show" style={{position: 'relative'}}>
                            <input autoComplete="off" onChange={this.getSearchResults} onFocus={addClass}
                                   onBlur={removeClass} type="text"
                                   placeholder="Search.." name="search" className="search-bar"/>
                            <button type="submit" className="search-bar-button"><i className="fa fa-search"></i>
                            </button>
                            {(this.state.searchResults.length !== 0) &&
                            <div className="search-results">
                                {this.state.searchResults.map(result => {
                                    return (<div onClick={this.closeSearchResults} key={result.id} className="result">
                                            <Link className="nav-search-link" to={`/products/${result.id}`}>
                                                {result.product_name}
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                            }
                            <i className="fas fa-shopping-basket desktop-show"></i>
                        </div>
                    </div>
                </div>
                <div className="mobile-nav-links mobile-show">
                    <div id="mobile-height-marker">
                        {routes.routes.map(this.createMobileNavItem)}
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

