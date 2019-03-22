import * as React from 'react';
import LoginForm from "./LoginForm";
import {LoginHoc} from "./formHoc";
import {SignupHoc} from "./formHoc";

interface State {
    showLoginForm: boolean;
}


class LoginPage extends React.Component<{}, State> {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    state: Readonly<State> = {
        showLoginForm: false,
    };

    handleClick(e: React.MouseEvent<HTMLElement>) {
        let type = e.currentTarget.getAttribute('data-type');
        if (type==='login'){
            this.setState({showLoginForm: true});
            e.currentTarget.classList.add('login-tab-active');
            document.getElementsByClassName('signup-tab-active')[0].classList.remove('signup-tab-active');
        } else {
            this.setState({showLoginForm: false});
            e.currentTarget.classList.add('signup-tab-active');
            document.getElementsByClassName('login-tab-active')[0].classList.remove('login-tab-active');
        }
    }

    render() {
        return (
            <div className="login-page">
                <div className="login-form-container">
                    <h1 style={{textDecoration: 'underline'}}>Login</h1>
                    <div className="form-wrapper">
                        <div className="form-tabs">
                            <div onClick={this.handleClick} data-type="signup" className="signup-tab generic-tab signup-tab-active">
                                Sign Up
                            </div>
                            <div onClick={this.handleClick} data-type="login" className="login-tab generic-tab">
                                Log In
                            </div>
                        </div>
                        <LoginHoc enabledForm={this.state.showLoginForm}/>
                        <SignupHoc enabledForm={!this.state.showLoginForm}/>
                    </div>
                </div>
            </div>
        )
    }
}


export default LoginPage;
