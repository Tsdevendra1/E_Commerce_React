import * as React from 'react';
import {createUser, fetchToken} from '../Redux/actions/tokenActions';
import {redirectFunction, routes} from '../routers';
import InputWithIcon from "../Forms/InputWithIcon";

interface SignupFormProps {
    dispatch: any;
    isFetching: boolean;
    accessToken: string;
    handleInputChange: (e: any) => void;
    username: string;
    email: string;
    password: string;
    isSubmitEnabled: () => boolean;
}


export default class SignupForm extends React.Component<SignupFormProps, {}> {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    static defaultProps = {
        username: '',
        email: '',
        password: '',
    };


    handleClick() {
        const {username, email, password} = this.props;
        this.props.dispatch(createUser(username, email, password))
    }

    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        const {isFetching, accessToken} = this.props;

        // accessToken is considered as user being 'logged in'
        if (accessToken) {
            // return redirectFunction('Product');
        }
        const disableSubmit = (!this.props.isSubmitEnabled() || !this.validateEmail(this.props.email));
        return (
            <div className="form-content">
                <div className="login-form-content">
                    <InputWithIcon name="username" type="text" placeholder="Enter username..."
                                   onChange={this.props.handleInputChange} value={this.props.username}>
                        <i className="far fa-user"></i>
                    </InputWithIcon>
                    <InputWithIcon autocomplete="off" name="email" type="email" placeholder="Enter email..."
                                   onChange={this.props.handleInputChange} value={this.props.email}>
                        <i className="fas fa-envelope"></i>
                    </InputWithIcon>
                    <InputWithIcon autocomplete="off" name="password" type="password" placeholder="Enter password..."
                                   onChange={this.props.handleInputChange} value={this.props.password}>
                        <i className="fas fa-key"></i>
                    </InputWithIcon>
                    <button style={{float: 'right'}} disabled={disableSubmit} onClick={this.handleClick}
                            type="button"
                            className="form-item btn btn-primary">
                        {isFetching ?
                            <i id="spinner" className="fas fa-spinner fa-spin"></i> : <span>Submit</span>
                        }
                    </button>
                </div>
            </div>
        )
    }
}


