import React from 'react';
import AddProductForm from "./AddProductForm";

class AddProductPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="add-product-page">
                <div className="add-form-container">
                    <h1 style={{textDecoration:'underline'}}>Add Product</h1>
                    <AddProductForm/>
                </div>
            </div>
        )
    }
}


export default AddProductPage;
