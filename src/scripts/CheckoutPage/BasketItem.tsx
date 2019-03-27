import * as React from 'react';
import ProductsService from "../ProductService";


interface Props {
    thumbnail: string;
    quantity: number;
    productId: number
    addPriceToTotal: (price: number) => void;
    ignoreDefaultMargin: boolean;
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

    static defaultProps = {
        ignoreDefaultMargin: false,
    };


    componentDidMount() {
        ProductsService.getProduct(this.props.productId).then(data => {
            this.setState({price: data.price, name: data.product_name});
            this.props.addPriceToTotal((data.price * this.props.quantity));

        }).catch(e => console.log(e.response.data))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.quantity !== this.props.quantity && this.state.price) {
            // This is a quick way to add the different from previous amount to current amount instead of keeping track of each productId and resetting the value
            this.props.addPriceToTotal((this.state.price * this.props.quantity) - (prevProps.quantity * this.state.price));
        }
    }

    render() {
        if (!this.state.price) {
            return <h1>FETCHING DATA...</h1>
        }
        return (
            <div className="basket-item" style={{margin: (!this.props.ignoreDefaultMargin) ? '40px 0' : 0}}>
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
