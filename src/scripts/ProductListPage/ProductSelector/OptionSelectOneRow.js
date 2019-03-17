import React from 'react';
import OptionSelectRow from "./OptionSelectRow";
import {connect} from 'react-redux';
import {fetchProductsIfNeeded} from "../../Redux/actions/productActions";

class OptionSelectOneRow extends React.Component {
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
            <OptionSelectRow handleClick={this.handleClick} {...this.props} selectType="one">
                <div style={{'verticalAlign': 'middle'}}><i ref={this.circleRef} className="far fa-circle"></i></div>
            </OptionSelectRow>
        )
    }
}

function mapStateToProps(state) {
    const {productList} = state;
    const {currentParams} = productList;
    return {
        currentParams
    }
}


export default connect(mapStateToProps)(OptionSelectOneRow)
