import * as React from 'react';
import {optionInterface} from "../AddProductPage/AddProductForm";


interface IbaseSelectFieldProps {
    name: string;
    onChangeFunction: (event: any) => void;
    inputValue: number;
    label: string;
    options: Array<optionInterface>;
    showModalFunc: ()=>void;
}

export default class BaseSelectField extends React.Component<IbaseSelectFieldProps> {
    componentDidMount() {
        if (this.props.inputValue === null) {
            throw 'BaseSelectField needs a default value';
        }
    }

    render() {
        let renderOptions = function (option) {
            return <option key={option.id} value={option.id}>{option.name}</option>
        };
        return (
            <label className="form-item base-field label-class">
                <div className="form-select-field">
                    <span>
                    {this.props.label}:
                    </span>
                    <span onClick={this.props.showModalFunc} className="add-category-button">
                        Add Category +
                    </span>
                </div>
                <select name={this.props.name} value={this.props.inputValue} onChange={this.props.onChangeFunction}>
                    {this.props.options.map(renderOptions)}
                </select>
            </label>
        );
    }
}

