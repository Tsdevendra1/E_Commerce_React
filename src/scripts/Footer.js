import React from 'react';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer">
                <div className="above-footer">
                    <a href="#"><i style={{"color": "#86513f"}} className="social-icon fab fa-instagram"></i></a>
                    <a href="#"><i style={{"color": "#4267b2"}} className="social-icon fab fa-facebook"></i></a>
                    <a href="#"><i style={{"color": "#fffc00"}} className="social-icon fab fa-snapchat"></i></a>
                </div>
                <div className="mobile-show mobile-footer">
                    <div className="mobile-footer-content">
                        <div className="mobile-left-footer">
                            © Parrot Clothing
                        </div>
                        <div className="mobile-right-footer">
                            <span className="mobile-right-footer-link-first">Privacy & Cookies</span>
                            <span className="mobile-right-footer-link-second">Ts&Cs</span>
                        </div>
                    </div>
                </div>
                <div className="desktop-show desktop-footer">
                    <div className="desktop-footer-content">
                        <div className="contact-footer">
                            <div className="desktop-col-header">
                                Contact
                            </div>
                            <div className="desktop-footer-row">
                                <a href="#">
                                    Contact us
                                </a>
                            </div>
                            <div className="desktop-footer-row">
                                <a href="#">
                                    Give us a ring
                                </a>
                            </div>
                        </div>
                        <div className="about-footer">
                            <div className="desktop-col-header">
                                About
                            </div>
                            <div className="desktop-footer-row">
                                <a href="#">
                                    Find out more
                                </a>
                            </div>
                        </div>
                        <div className="info-footer">
                            <div className="desktop-col-header">
                                Help and Information
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}