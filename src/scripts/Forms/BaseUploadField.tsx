import * as React from 'react';

interface IbaseUploadFieldProps {
    onChangeFunction: (event: any) => void;
    name: string;
    label: string;
    render?: any;
    innerRef: React.RefObject<HTMLInputElement>;
}

export default class BaseUploadField extends React.Component<IbaseUploadFieldProps> {
    render() {
        return (
            <label className="base-field form-item label-class">
                <span className="base-label-class">
                {this.props.label}:
                    {this.props.render}
                </span>
                <input onChange={this.props.onChangeFunction} ref={this.props.innerRef} type="file"
                       name={this.props.name}/>
            </label>
        );
    }
}

