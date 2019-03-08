import React from 'react';
import OptionSelectRow from "./OptionSelectRow";

export default class OptionSelectOneRow extends React.Component {
    constructor(props) {
        super(props);
        this.circleRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let circleIcon = this.circleRef.current;
        circleIcon.classList.toggle('far');
        circleIcon.classList.toggle('fas');
    }

    render() {
        return (
            <OptionSelectRow handleClick={this.handleClick} optionName={this.props.optionName}>
                <div style={{'verticalAlign': 'middle'}}><i ref={this.circleRef} className="far fa-circle"></i></div>
            </OptionSelectRow>
        )
    }
}

