import PropTypes from 'prop-types';
import React from 'react';

export default class BaseUploadField extends React.Component {
    render() {
        return (
            <label  className="base-field form-item">
                {this.props.label}:
                <input onChange={this.props.onChangeFunction} ref={this.props.innerRef} type="file" name={this.props.name} />
            </label>
        );
    }
}

BaseUploadField.propTypes = {
    onChangeFunction: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    innerRef: PropTypes.object.isRequired,
};
