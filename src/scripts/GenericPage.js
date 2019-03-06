import React from 'react';
import NavBar from './NavBar'

class GenericPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        render(
            <React.Fragment>
                <NavBar/>
                {this.props.children}
            </React.Fragment>
        )
    }
}

export default GenericPage;