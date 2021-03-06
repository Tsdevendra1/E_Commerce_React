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
            let signUpTab = document.getElementsByClassName('signup-tab-active')[0];
            if (signUpTab){
                signUpTab.classList.remove('signup-tab-active');
            }
        } else {
            this.setState({showLoginForm: false});
            e.currentTarget.classList.add('signup-tab-active');
            let loginUpTab = document.getElementsByClassName('login-tab-active')[0];
            if (loginUpTab){
                loginUpTab.classList.remove('login-tab-active');
            }
        }
    }

    render() {
        return (
            <div className="login-page my-5">
                <div className="login-form-container">
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
