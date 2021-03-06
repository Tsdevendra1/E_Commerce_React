import React from 'react';
import ReactDOM from 'react-dom';

export default class OptionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.renderOptionsBox = this.renderOptionsBox.bind(this);
        this.optionBoxRef = React.createRef();
        this.optionBoxArrowRef = React.createRef();
        this.selectorStyleRef = React.createRef();
        this.showOptionsBox = this.showOptionsBox.bind(this);
    }

    renderOptionsBox() {
        // Renders default option box if no children given
        if (this.props.children) {
            // return this.props.children with props passed
            return React.cloneElement(this.props.children, {selectorOptions: this.props.selectorOptions});
        } else {
            throw 'Child must be specific (Custom Component)';
        }
    }

    checkCurrentActive() {
        let optionBoxArrow = this.optionBoxArrowRef.current;
        let optionBox = this.optionBoxRef.current;
        let selectorStyle = this.selectorStyleRef.current;
        if (this.props.currentActiveComponentId === this.props.componentId) {
            optionBoxArrow.classList.remove('fa-chevron-down');
            optionBoxArrow.classList.add('fa-chevron-up');
            selectorStyle.classList.add('selected-option-active');
            optionBox.style.display = 'block';
        } else {
            optionBoxArrow.classList.add('fa-chevron-down');
            optionBoxArrow.classList.remove('fa-chevron-up');
            selectorStyle.classList.remove('selected-option-active');
            optionBox.style.display = 'none';
        }
    }

    showOptionsBox() {
        // This set's which box is currently active
        if (this.props.currentActiveComponentId !== this.props.componentId) {
            // Set the current one to active
            this.props.handleClick(this.props.componentId);
        } else {
            // Set none of them as active if we are clicking the same one that is active
            this.props.handleClick(null);
        }

        this.checkCurrentActive();
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentActiveComponentId !== prevProps.currentActiveComponentId) {
            this.checkCurrentActive();
        }
        let selectedOptions = ReactDOM.findDOMNode(this).getElementsByClassName('option-box-active');
        let selectorButton = document.getElementById(`${this.props.componentId}click`);
        if (selectedOptions.length){
            selectorButton.classList.add('active-selector');
        } else {
            selectorButton.classList.remove('active-selector');
        }
    }

    render() {
        return (
            <div id={this.props.componentId} className="selector-group">
                <div id={`${this.props.componentId}click`} onClick={this.showOptionsBox} ref={this.selectorStyleRef} className="selector-style">
                    <div className="selector-type-text">
                        {this.props.selectorType}
                    </div>
                    <div style={{'verticalAlign': 'middle'}}>
                        <i ref={this.optionBoxArrowRef} className="fas fa-chevron-down"></i>
                    </div>
                </div>
                <div ref={this.optionBoxRef} className="selector-options">
                    {this.renderOptionsBox()}
                </div>
            </div>
        )
    }
}