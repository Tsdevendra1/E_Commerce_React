import React from 'react';

export default class OptionSelectRow extends React.Component {
    constructor(props) {
        super(props);
        this.rowRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.handleClick){
            this.props.handleClick();
        }
        let row = this.rowRef.current;
        row.classList.toggle('option-box-active');
    }

    render() {
        return (
            <div ref={this.rowRef} onClick={this.handleClick} className="option-box option-box-flex">{this.props.optionName}{this.props.children}</div>
        )
    }
}
