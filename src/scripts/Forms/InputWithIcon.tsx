import * as React from 'react';


interface Props {
    name: string;
    type: string;
    placeholder: string;
    value: string | undefined;
    onChange: (event: any) => void;
    autocomplete?: string;
}

export default class InputWithIcon extends React.Component<Props, {}> {
    render() {
        return (
            <label className="input-with-icon">
                <span className="input-icon">
                    {this.props.children}
                </span>
                <input autoComplete={this.props.autocomplete} onChange={this.props.onChange} type={this.props.type} className="input-input"
                       name={this.props.name} value={this.props.value}
                       placeholder={this.props.placeholder}/>
            </label>
        )
    }
}



