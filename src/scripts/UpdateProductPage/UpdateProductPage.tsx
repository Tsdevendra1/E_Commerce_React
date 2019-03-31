import * as React from 'react';
import AddProductForm from "../AddProductPage/AddProductForm";

export enum PageType {
    Add = 1,
    Update = 2,
}


interface Props {
    match: any;
}


class UpdateProductPage extends React.Component<Props,{}> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="add-product-page">
                <div className="add-form-container">
                    <h1 style={{textAlign: 'center'}}><b>Update Product</b></h1>
                    <AddProductForm productUpdateId={this.props.match.params.id} type={PageType.Update}/>
                </div>
            </div>
        )
    }
}


export default UpdateProductPage;
