import * as React from 'react';

interface IbaseSelectFieldProps {
    name: string;
    onChangeFunction: (event: any) => void;
    inputValue: string;
    label: string;
    options: Array<string>;
}
export default class BaseSelectField extends React.Component<IbaseSelectFieldProps> {
    componentDidMount(){
        if (this.props.inputValue === ''){
            throw 'BaseSelectField needs a default value';
        }
    }
    render() {
        let renderOptions = function (option) {
            return <option key={option} value={option}>{option}</option>
        };
        return (
            <label className="form-item base-field">
                {this.props.label}:
                <select name={this.props.name} value={this.props.inputValue} onChange={this.props.onChangeFunction}>
                    {this.props.options.map(renderOptions)}
                </select>
            </label>
        );
    }
}

