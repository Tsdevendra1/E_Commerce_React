import * as React from 'react';
import {connect} from "react-redux";
import LoginForm from './LoginForm';
import SignupForm from "./SignupForm";


// Props the resulting component to take (besides the props of the wrapped component)
export interface ExternalProps {
    dispatch: any;
    isFetching: boolean;
    accessToken: string;
    enabledForm: boolean;
    userId: number;
}

// Props the HOC adds to the wrapped component
export interface InjectedProps {
    handleInputChange: (e: any) => void;
    checkSubmitButtonDisable: ()=>boolean;
}



function formHoc(WrappedComponent: React.ComponentType<any>) {

    return class extends React.Component<ExternalProps, {}> implements InjectedProps {

        constructor(props) {
            super(props);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.checkSubmitButtonDisable = this.checkSubmitButtonDisable.bind(this);
        }

        componentDidMount() {
            // Set initial state for form inputs
            this.setState((WrappedComponent.defaultProps as any));
        }

        checkSubmitButtonDisable() {
            for (let key in this.state) {
                if (this.state[key] === '' || this.state[key] === null || this.state[key] === undefined) {
                    return false;
                }
            }
            return true;
        }

        handleInputChange(event) {
            // TODO: So far this assumes inputs are only text or checked need to include other types
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            this.setState({
                [name]: value
            } as any);
        }

        render() {
            return (
                <div style={{display: (this.props.enabledForm) ? 'block' : 'none'}}>
                    <WrappedComponent {...this.state} {...this.props} handleInputChange={this.handleInputChange}
                                      isSubmitEnabled={this.checkSubmitButtonDisable}/>
                </div>
            )
        }
    };
}

function mapStateToProps(state) {
    const {jwtToken} = state;
    const {isFetching, accessToken, userId} = jwtToken;
    return {
        isFetching,
        accessToken,
        userId,
    }
}



export const LoginHoc = connect(mapStateToProps)(formHoc(LoginForm));
export const SignupHoc = connect(mapStateToProps)(formHoc(SignupForm));
