import React from 'react';
import OptionSelectRow from "./OptionSelectRow";

export default class OptionSelectManyRow extends React.Component {
    render() {
        return (
            <OptionSelectRow {...this.props} selectType="many">
                <div>{this.props.optionName}<span style={{'marginLeft':'0.75rem'}} >({this.props.optionAmount})</span></div>
            </OptionSelectRow>
        )
    }
}
