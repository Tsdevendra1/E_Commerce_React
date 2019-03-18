import React from 'react';
import LoginForm from "./LoginForm";

class LoginPage extends React.Component {
    render() {
        return (
            <div className="login-page">
                <div className="login-form-container">
                    <h1 style={{textDecoration: 'underline'}}>Login</h1>
                    <LoginForm/>
                </div>
            </div>
        )
    }
}


export default LoginPage;
