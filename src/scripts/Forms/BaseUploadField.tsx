import * as React from 'react';

interface IbaseUploadFieldProps {
    onChangeFunction: (event: any) => void;
    name: string;
    label: string;
    innerRef: React.RefObject<HTMLInputElement>;
}

export default class BaseUploadField extends React.Component<IbaseUploadFieldProps> {
    render() {
        return (
            <label  className="base-field form-item label-class">
                {this.props.label}:
                <input onChange={this.props.onChangeFunction} ref={this.props.innerRef} type="file" name={this.props.name} />
            </label>
        );
    }
}

