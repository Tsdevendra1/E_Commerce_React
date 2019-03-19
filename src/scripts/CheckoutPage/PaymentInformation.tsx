import * as React from 'react';


interface Props {
}

interface paymentTypes {
    paymentType: string;
    active: boolean
}

interface State {
    tabs: Array<paymentTypes>;
    currentActiveTab: string;
}

export default class PaymentInformation extends React.Component<Props, State> {
    state: Readonly<State> = {
        tabs: [
            {paymentType: 'CARD', active: true},
            {paymentType: 'SEPA Direct Debit', active: false}
        ],
        currentActiveTab: 'CARD',
    };

    constructor(props) {
        super(props);
        this.changeActive = this.changeActive.bind(this);
    }

    changeActive(e) {
        // Keep track of which is active based on current clicked element
        for (let tab of this.state.tabs) {
            tab.active = e.currentTarget.id === tab.paymentType;
        }
        this.setState({currentActiveTab: e.currentTarget.id})
    }

    render() {
        return (
            <div>
                <div>
                    <ul className="payment-tabs">
                        {this.state.tabs.map(tabInfo => {

                            let liClass = '';
                            let spanClass = 'payment-type';
                            if (tabInfo.active) {
                                liClass = 'active-tab';
                                spanClass += ' payment-tab-active';
                            }
                            return (
                                <li id={tabInfo.paymentType} key={tabInfo.paymentType} onClick={this.changeActive}
                                    className={liClass}>
                                    <a style={{cursor: 'pointer'}}>
                                        <span className={spanClass}>
                                    {tabInfo.paymentType}
                                        </span>
                                    </a>
                                </li>
                            )
                        })}
                        <div className="empty-bar"></div>
                    </ul>
                    <button type="button" className="btn checkout-button">Confirm Payment
                        with {this.state.currentActiveTab}</button>
                </div>
            </div>
        )
    }


}
