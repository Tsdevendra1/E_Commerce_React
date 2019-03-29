import React from 'react';
import AddProductForm from "./AddProductForm.tsx";

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
                    <h1 style={{textDecoration: 'underline', textAlign: 'center'}}>Add Product</h1>
                    <AddProductForm/>
                </div>
            </div>
        )
    }
}


export default AddProductPage;
