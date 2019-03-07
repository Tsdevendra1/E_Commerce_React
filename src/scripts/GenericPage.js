import React from 'react';
import NavBar from './NavBar'
import Footer from "./Footer";

class GenericPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <NavBar navs={navInfo} profileImgPath={profileImagePath}/>
                <div className="top-margin-for-nav">
                    {this.props.children}
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default GenericPage;