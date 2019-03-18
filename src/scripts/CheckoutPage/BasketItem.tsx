import * as React from 'react';


interface Props {
}

interface State {
}

export default class BasketItem extends React.Component<Props, State> {
    state: Readonly<State> = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="basket-item">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg"
                    className="basket-item-img"/>
                <div className="item-info">
                    <div className="item-header">
                        PRO
                    </div>
                    <div className="text-muted">
                        Billing starts: Apr 10, 2019
                    </div>
                    <div>
                        £11.99/mo
                    </div>
                </div>
            </div>
        )
    }


}
