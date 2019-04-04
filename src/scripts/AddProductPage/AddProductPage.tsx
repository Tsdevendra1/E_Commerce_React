import * as React from 'react';
import AddProductForm from "./AddProductForm";
import {PageType} from "../UpdateProductPage/UpdateProductPage";

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
                    <AddProductForm type={PageType.Add}/>
                </div>
            </div>
        )
    }
}


export default AddProductPage;
