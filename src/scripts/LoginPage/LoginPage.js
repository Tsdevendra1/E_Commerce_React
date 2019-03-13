import React from 'react';
import LoginForm from "./LoginForm";

class LoginPage extends React.Component {
    render() {
        return (
            <div className="add-product-page">
                <div className="add-form-container">
                    <h1 style={{textDecoration: 'underline'}}>Login</h1>
                    <LoginForm/>
                </div>
            </div>
        )
    }
}


export default LoginPage;
