import React from 'react';
import BaseInputField from "../Forms/BaseInputField";
import BaseSelectField from "../Forms/BaseSelectField";

class AddProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: '',
            product_type: '',
            price: '',
            description: '',
            thumbnail: '',

        };

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form action="/api/product/" method="post" className="custom-form">
                <BaseInputField type="text" label="Product Name" name="product_name"
                                inputValue={this.state.product_name}
                                onChangeFunction={this.handleInputChange}/>
                <BaseInputField type="number" label="Product Price (£)" name="price" inputValue={this.state.price}
                                onChangeFunction={this.handleInputChange}/>
                <BaseInputField type="text" label="Product Description" name="description"
                                inputValue={this.state.description}
                                onChangeFunction={this.handleInputChange}/>
                <BaseSelectField options={['Top', 'Bottom']} label="Product Type" name="product_type"
                                 inputValue={this.state.product_type}
                                 onChangeFunction={this.handleInputChange}/>
                <button type="submit" className="form-item btn btn-primary">Submit</button>
            </form>
        )
    }
}


export default AddProductForm;

