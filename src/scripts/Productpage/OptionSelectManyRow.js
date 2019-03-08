import React from 'react';
import OptionSelectRow from "./OptionSelectRow";

export default class OptionSelectManyRow extends React.Component {
    constructor(props) {
        super(props);
        this.circleRef = React.createRef();
    }


    render() {
        return (
            <OptionSelectRow>
                <div>{this.props.optionName}<span style={{'marginLeft':'0.75rem'}} >({this.props.optionAmount})</span></div>
            </OptionSelectRow>
        )
    }
}
