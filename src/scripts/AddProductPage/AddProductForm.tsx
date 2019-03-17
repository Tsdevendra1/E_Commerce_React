import * as React from 'react';
import BaseSelectField from "../Forms/BaseSelectField";
import BaseInputField from "../Forms/BaseInputField";
import {connect} from 'react-redux';
import ProductsService from "../ProductService";
import BaseUploadField from "../Forms/BaseUploadField";
import * as ReactDOM from "react-dom";
import {redirectFunction} from "../routers";

interface IaddProductFormProps {
    accessToken: string;
}

interface IaddProductFormState {
    product_name: string;
    product_type: string;
    price: string;
    description: string;
    thumbnail: any;
    isSending: boolean;
}


class AddProductForm extends React.Component<IaddProductFormProps, IaddProductFormState> {

    product_type_default = 'Top';
    imageUploadRef: React.RefObject<HTMLInputElement>;


    constructor(props) {
        super(props);
        this.imageUploadRef = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    readonly state: IaddProductFormState = {
        product_name: '',
        product_type: this.product_type_default,
        price: '',
        description: '',
        thumbnail: '',
        isSending: false,
    };

    public handleInputChange(event) {
        const target = event.target;
        let value;
        if (target.type === 'checkbox') {
            value = target.checked
        } else if (target.type === 'file') {
            value = target.files[0];
        } else {
            value = target.value;
        }
        let name = target.name;
        this.setState({[name]: value} as any);
    }

    resetForm() {
        // Set all fields to default value
        for (let field in this.state) {
            if (field === 'product_type') {
                this.setState({
                    [field]: this.product_type_default,
                })
            } else if (field !== 'isSending') {
                this.setState({
                    [field]: ''
                } as any)
            }
        }
        let inputFields = (ReactDOM.findDOMNode(this) as Element).getElementsByTagName('input');
        // Reset all input file fields
        for (let field of inputFields) {
            if (field.type === 'file') {
                field.value = '';
            }
        }
    }

    public handleFormSubmit() {
        let fieldValues: IaddProductFormState = Object.assign({}, this.state);
        // We only need field values
        delete fieldValues.isSending;

        let data = new FormData();
        for (let field in fieldValues) {
            data.append(field, fieldValues[field]);
        }

        // We are about to send the data
        this.setState({
            isSending: true,
        });
        ProductsService.createProduct(data, this.props.accessToken).then(response => {
            console.log(response.data);
            this.resetForm();
        }).catch(e => {
            if (e.response) {
                console.log(e.response.data);
            }
        }).then(() => {
            // After everything set not sending
            this.setState({
                isSending: false,
            });
        });
    }

    render() {
        const isEnabled: boolean = (this.state.product_name.length > 0 && this.state.description.length > 0 && this.state.price.length > 0 && this.state.thumbnail !== '');
        if (!this.props.accessToken) {
            return redirectFunction('Login');
        }
        return (
            <form method="post" className="custom-form">
                <BaseInputField type="text" label="Product Name" name="product_name"
                                inputValue={this.state.product_name}
                                onChangeFunction={this.handleInputChange}/>
                <BaseInputField type="number" label="Product Price (£)" name="price" inputValue={this.state.price}
                                onChangeFunction={this.handleInputChange}/>
                <BaseInputField type="text" label="Product Description" name="description"
                                inputValue={this.state.description}
                                onChangeFunction={this.handleInputChange}/>
                <BaseUploadField onChangeFunction={this.handleInputChange} innerRef={this.imageUploadRef}
                                 name="thumbnail" label="Product Thumbnail"/>
                <BaseSelectField options={['Top', 'Bottom']} label="Product Type" name="product_type"
                                 inputValue={this.state.product_type}
                                 onChangeFunction={this.handleInputChange}/>
                <button disabled={!isEnabled} onClick={this.handleFormSubmit} type="button"
                        className="form-item btn btn-primary">
                    {this.state.isSending ?
                        <i id="spinner" className="fas fa-spinner fa-spin"></i> : <span>Submit</span>
                    }
                </button>
            </form>
        )
    }
}


function mapStateToProps(state) {
    const {jwtToken} = state;
    const {accessToken} = jwtToken;
    return {
        accessToken
    }
}

export default connect(mapStateToProps)(AddProductForm);
