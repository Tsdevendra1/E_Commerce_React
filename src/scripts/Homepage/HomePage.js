import React from 'react';
import ProductService from './../ProductService'
import getCookie from './../get-cookies-function'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <h1>This is the homepage</h1>
        )
    }
}


export default HomePage;
