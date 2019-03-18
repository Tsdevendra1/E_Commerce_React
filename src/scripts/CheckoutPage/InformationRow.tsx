import * as React from 'react';
import {rowInfo} from "./CheckoutInformation";


interface Props {
    rowInfo: rowInfo;
}

interface State {
}

export default class InformationRow extends React.Component<Props, State> {
    state: Readonly<State> = {
    };

    constructor(props) {
        super(props);
    }

    render(){
        const {rowInfo} =  this.props;
        return (
            <div className="checkout-row">
                <div className="information-row-type">
                    <span className="flex-align-vertical">
                        {rowInfo.rowType}
                    </span>
                </div>
                <input name={rowInfo.name} className="information-row-input" type="text" placeholder={rowInfo.placeholder} />
            </div>
        )
    }


}
