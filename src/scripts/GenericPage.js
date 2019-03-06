import React from 'react';
import NavBar from './NavBar'

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
            </React.Fragment>
        )
    }
}

export default GenericPage;