import React from 'react';
import ProductService from './../ProductService'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="typewriter-container">
                <img className="homepage-image" src="/static/main/static/images/animal-avian-beak-1200857.jpg"/>
                <div className="text-block typewriter">
                    <h1>Welcome</h1>
                    <p className="typewriter">To Parrot Clothing</p>
                </div>
            </div>
        )
    }
}


export default HomePage;
