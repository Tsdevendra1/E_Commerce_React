import * as React from 'react';
import InformationRow from "./InformationRow";

export interface rowInfo {
    rowType: string;
    placeholder: string;
    name: string;
}

interface Props {
}


interface State {
    rowComponents: Array<any>;
}

export default class CheckoutInformation extends React.Component<Props, State> {
    state: Readonly<State> = {
        rowComponents: [
            {rowType: 'Name', placeholder: 'Please enter your name', name: 'name'},
            {rowType: 'Email', placeholder: 'fake@email.com', name: 'email'},
            {rowType: 'Address', placeholder: '185 London Street', name:'address'},
            {rowType: 'City', placeholder: 'London', name:'city'},
            {rowType: 'Postal Code', placeholder: 'DE90 7XH', name:'postalcode'},
        ]
    };

    constructor(props) {
        super(props);
    }


    render() {
        let rowComponent = function(rowInfo){
          return (
              <InformationRow key={rowInfo.rowType} rowInfo={rowInfo}/>
          )
        };
        return (
            <div className="checkout-information-box">
                {this.state.rowComponents.map(rowComponent)}
            </div>
        )
    }


}
