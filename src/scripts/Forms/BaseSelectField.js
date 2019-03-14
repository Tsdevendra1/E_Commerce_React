import PropTypes from 'prop-types';
import React from 'react';

export default class BaseSelectField extends React.Component {
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

BaseSelectField.propTypes = {
    name: PropTypes.string.isRequired,
    onChangeFunction: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
};
