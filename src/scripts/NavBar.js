import React from 'react';
import ReactDOM from 'react-dom';
import Logo from "./Logo";
import {Link} from 'react-router-dom';
import {routes} from './routers';
import ProductsService from "./ProductService";
import BasketItem from './CheckoutPage/BasketItem';
import NavBasket from "./NavBasket";
import {MobileBasket} from "./BasketHoc";

export var timeoutHandle;

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
        this.removeClass = this.removeClass.bind(this);
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
        let sBrowser, sUsrAg = navigator.userAgent;
        let thisComponent = ReactDOM.findDOMNode(this);
        if (sUsrAg.indexOf("Chrome") > -1) {
            let buttons = thisComponent.getElementsByTagName('button');
            let inputs = thisComponent.getElementsByTagName('inputs');

            for (let button of buttons) {
                button.classList.add('change-line-height');
            }
            for (let input of inputs) {
                input.classList.add('change-line-height');
            }
        }
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
            <div key={navItem.name}><Link style={{height: '100%', width: '100%', display: 'block'}}
                                          data-main-nav={parentNavId}
                                          onClick={this.closeMainTab}
                                          className="desktop-nav-item"
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

    closeSearchResults(event) {
        this.setState({searchResults: []});
        document.querySelector('.search-bar').value = '';
        document.querySelector('.mobile-search-bar-input').value = '';
        let mobileSearchBar = document.getElementsByClassName('mobile-search-bar')[0];
        if (!mobileSearchBar.classList.contains('base-hide-class')) {
            mobileSearchBar.classList.add('base-hide-class');
        }
    }

    toggleMobileSearchBar() {
        let mobileSearchBar = document.getElementsByClassName('mobile-search-bar')[0];
        mobileSearchBar.classList.toggle('base-hide-class');
    }

    removeClass(event) {
        let buttons = document.getElementsByClassName('search-bar-button');
        for (let button of buttons) {
            button.classList.remove('button-focus');
        }
        // TODO: Not a great way to do this, should fix later. Need timeout to let click fire first if a link is clicked on the search results
        setTimeout(() => {
            this.setState({searchResults: []});
        }, 100);
    };

    static showMobileBasket(keepDisplay) {
        const mobileBasket = document.getElementById('mobile-basket');
        const numBasketItems = parseInt(mobileBasket.getAttribute('data-numitems'));
        if (timeoutHandle) {
            window.clearTimeout(timeoutHandle);
            timeoutHandle = null;
        }
        if (numBasketItems > 0) {
            // Make basket visible
            mobileBasket.classList.remove('base-hide-class');
            mobileBasket.classList.add('top-change');
            if (!keepDisplay) {
                timeoutHandle = window.setTimeout(function () {
                    const mobileBasket = document.getElementById('mobile-basket');
                    mobileBasket.classList.remove('top-change');
                    mobileBasket.classList.add('top-change-reverse');
                    setTimeout(() => {
                        mobileBasket.classList.remove('top-change-reverse');
                        mobileBasket.classList.add('base-hide-class');
                    }, 500)
                }, 2500);
            }
        }
    }

    render() {
        let addClass = function () {
            let buttons = document.getElementsByClassName('search-bar-button');
            for (let button of buttons) {
                button.classList.add('button-focus');
            }
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
                        <i onClick={this.toggleMobileSearchBar} style={{margin: '0 25px 0 0'}}
                           className="fas fa-search mobile-show"></i>
                        <Link to="/login/">
                            <i style={{margin: '0 25px 0 0'}} className="fas fa-user mobile-show"></i>
                        </Link>
                        <i id="show-mobile-button" onClick={this.handleClick} className="mobile-show fas fa-bars"></i>
                        <div className="center-vertical search-bar-wrapper desktop-show" style={{position: 'relative'}}>
                            <input autoComplete="off" onChange={this.getSearchResults} onFocus={addClass}
                                   onBlur={this.removeClass} type="text"
                                   placeholder="Search.." name="search" className="search-bar"/>
                            <button type="submit" className="search-bar-button"><i className="fa fa-search"></i>
                            </button>
                            {(this.state.searchResults.length !== 0) &&
                            <div className="search-results">
                                {this.state.searchResults.map(result => {
                                    return (<div key={result.id}
                                                 className="result nav-search-link">
                                            <Link onClick={this.closeSearchResults}
                                                  style={{width: '100%', height: '100%', display: 'block'}}
                                                  to={`/products/${result.id}`}>
                                                {result.product_name}
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                            }
                            <Link to="/login/">
                                <i style={{margin: '0 25px 0 10px'}} className="fas fa-user desktop-show"></i>
                            </Link>
                            <Link to="/checkout/">
                                <i onMouseOverCapture={() => {
                                    this.showMobileBasket()
                                }}
                                   className="fas fa-shopping-basket desktop-show"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mobile-nav-links mobile-show">
                    <div id="mobile-height-marker">
                        {routes.routes.map(this.createMobileNavItem)}
                    </div>
                </div>
                <div className="mobile-search-bar mobile-show base-hide-class">
                    <i onClick={this.toggleMobileSearchBar}
                       className="fas fa-times mobile-show mobile-search-bar-close"></i>
                    <div className="mobile-search-bar-wrapper">
                        <input autoComplete="off" onChange={this.getSearchResults} onFocus={addClass}
                               onBlur={this.removeClass} type="text"
                               placeholder="Search.." name="search" className="search-bar mobile-search-bar-input"/>
                        <button type="submit" className="search-bar-button mobile-search-bar-button"><i
                            className="fa fa-search"></i>
                        </button>
                        <div className="mobile-search-results"
                             style={{display: (this.state.searchResults.length === 0) ? 'none' : 'block'}}>
                            {this.state.searchResults.map(result => {
                                return (<div key={result.id}
                                             className="result nav-search-link">
                                        <Link onClick={this.closeSearchResults}
                                              style={{width: '100%', height: '100%', display: 'block'}}
                                              to={`/products/${result.id}`}>
                                            {result.product_name}
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="desktop-nav-links desktop-show" style={{'display': 'none'}}>
                    <div className="desktop-navs-container">
                        {routes.routes.map(navItem => {
                            return this.createDesktopNavItem(navItem, 'home-main-nav')
                        })}
                    </div>
                </div>
                <MobileBasket/>
            </div>
        )
    }

}

