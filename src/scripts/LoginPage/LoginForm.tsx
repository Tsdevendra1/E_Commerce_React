import * as React from 'react';
import BaseInputField from "../Forms/BaseInputField";
import {connect} from 'react-redux';
import {fetchToken} from '../Redux/actions/tokenActions';
import {redirectFunction, routes} from '../routers';

interface IloginFormProps {
    dispatch: any;
    isFetching: boolean;
    accessToken: string;
}

interface IloginFormState {
    username: string;
    password: string;
}


class LoginForm extends React.Component<IloginFormProps, IloginFormState> {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    readonly state: IloginFormState = {
        username: '',
        password: ''
    };

    componentDidMount() {
        console.log('Inside the tsx file');
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        } as any);
    }

    handleClick() {
        const {dispatch} = this.props;
        dispatch(fetchToken(this.state.username, this.state.password));
    }

    render() {
        const isEnabled = this.state.username.length > 0 && this.state.password.length > 0;
        const {isFetching, accessToken} = this.props;

        // accessToken is considered as user being 'logged in'
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


function mapStateToProps(state) {
    const {jwtToken} = state;
    const {isFetching, accessToken} = jwtToken;
    return {
        isFetching,
        accessToken,
    }
}

export default connect(mapStateToProps)(LoginForm)
