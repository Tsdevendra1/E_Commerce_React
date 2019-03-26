import * as React from 'react';
import ProductsService from "../ProductService";


interface Props {
    thumbnail: string;
    quantity: number;
    productId: number
    addPriceToTotal: (price: number) => void;
}

interface State {
    price: number | null;
    name: string;
}

export default class BasketItem extends React.Component<Props, State> {
    state: Readonly<State> = {
        price: null,
        name: '',
    };


    componentDidMount() {
        ProductsService.getProduct(this.props.productId).then(data => {
            this.setState({price: data.price, name: data.product_name});
            this.props.addPriceToTotal((data.price * this.props.quantity));

        }).catch(e => console.log(e.response.data))
    }

    render() {
        if (!this.state.price) {
            return <h1>FETCHING DATA...</h1>
        }
        return (
            <div className="basket-item">
                <img
                    src={this.props.thumbnail}
                    className="basket-item-img"/>
                <div className="item-info">
                    <div className="item-header">
                        {this.state.name}
                    </div>
                    <div className="text-muted">
                        Quantity: {this.props.quantity}
                    </div>
                    <div>
                        £{this.state.price}
                    </div>
                </div>
            </div>
        )
    }


}