import React from 'react';
import BaseInputField from "../Forms/BaseInputField";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import fetchToken from '../Redux/tokenActions';
import {Redirect} from 'react-router-dom';
import {redirectFunction, routes} from '../routers';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isEmpty: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleClick() {
        const {dispatch} = this.props;
        dispatch(fetchToken(this.state.username, this.state.password));
    }

    render() {
        const isEnabled = this.state.username.length > 0 & this.state.password.length > 0;
        const {isFetching, accessToken, refreshToken} = this.props;
        if (accessToken) {
            return redirectFunction('Product');
        }
        return (
            <form method="post" className="custom-form">
                <BaseInputField type="username" label="Username" name="username" inputValue={this.state.username}
                                onChangeFunction={this.handleInputChange}/>
                <BaseInputField type="password" label="Password" name="password" inputValue={this.state.password}
                                onChangeFunction={this.handleInputChange}/>
                <button disabled={!isEnabled} onClick={this.handleClick} type="button"
                        className="form-item btn btn-primary">
                    {isFetching ?
                        <i id="spinner" className="fas fa-spinner fa-spin"></i> : <span>Submit</span>
                    }
                </button>
            </form>
        )
    }
}


LoginForm.propTypes = {
    dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    const {jwtToken} = state;
    const {isFetching, accessToken, refreshToken} = jwtToken;
    return {
        isFetching,
        accessToken,
        refreshToken
    }
}

export default connect(mapStateToProps)(LoginForm)
