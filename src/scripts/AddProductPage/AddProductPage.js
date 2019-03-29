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
                    <h1 style={{textAlign: 'center'}}><b>Add Product</b></h1>
                    <AddProductForm/>
                </div>
            </div>
        )
    }
}


export default AddProductPage;
