import * as React from 'react';
import {fetchToken} from '../Redux/actions/tokenActions';
import {redirectFunction, routes} from '../routers';
import InputWithIcon from "../Forms/InputWithIcon";

interface Props {
    dispatch: any;
    isFetching: boolean;
    accessToken: string;
    handleInputChange: (e:any) => void;
    username: string;
    password: string;
    isSubmitEnabled: ()=>boolean;
}



export default class LoginForm extends React.Component<Props, {}> {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    static defaultProps = {
        username: '',
        password: '',
    };


    handleClick() {

        const {dispatch, username, password} = this.props;
        if (username && password){
            dispatch(fetchToken(username, password));
        }
    }

    render() {
        const {isFetching, accessToken} = this.props;

        // accessToken is considered as user being 'logged in'
        if (accessToken) {
            return redirectFunction('Product');
        }
        return (
            <div className="form-content">
                <div className="login-form-content">
                    <InputWithIcon name="username" type="username" placeholder="Enter username..."
                                   onChange={this.props.handleInputChange} value={this.props.username}>
                        <i className="far fa-user"></i>
                    </InputWithIcon>
                    <InputWithIcon name="password" type="password" placeholder="Enter password..."
                    onChange={this.props.handleInputChange} value={this.props.password}>
                    <i className="fas fa-key"></i>
                    </InputWithIcon>
                    <button style={{float: 'right'}} disabled={!this.props.isSubmitEnabled()} onClick={this.handleClick} type="button"
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


