import PropTypes from 'prop-types';
import React from 'react';

export default class BaseInputField extends React.Component {
    render() {
        return (
            <label  className="base-field form-item">
                {this.props.label}:
                <input onChange={this.props.onChangeFunction} value={this.props.inputValue} type={this.props.type} name={this.props.name} />
            </label>
        );
    }
}

BaseInputField.propTypes = {
    name: PropTypes.string.isRequired,
    onChangeFunction: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};
