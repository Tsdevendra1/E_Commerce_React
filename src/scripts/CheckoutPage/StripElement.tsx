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
            <h1>HI HELLO</h1>
        )
    }


}
