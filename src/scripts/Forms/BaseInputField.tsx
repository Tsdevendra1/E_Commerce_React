import * as React from 'react';

interface IbaseInputFieldProps {
    name: string;
    onChangeFunction: (event: any) => void;
    inputValue: string;
    label: string;
    type: string;
}

export default class BaseInputField extends React.Component<IbaseInputFieldProps> {
    render() {
        return (
            <label className="base-field form-item label-class">
                {this.props.label}:
                <input onChange={this.props.onChangeFunction} value={this.props.inputValue} type={this.props.type}
                       name={this.props.name}/>
            </label>
        );
    }
}
