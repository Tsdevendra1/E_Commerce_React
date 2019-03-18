import * as React from 'react';
import OptionSelector from "./ProductSelector/OptionSelector";
import SelectOneOptionBox from "./ProductSelector/SelectOneOptionBox";
import SelectManyOptionBox from "./ProductSelector/SelectManyOptionBox";
import ProductService from '../ProductService';

interface State {
    activeID: boolean | null;
    haveGotCategories: boolean;
}

interface selectOptions {
    id: number;
    optionName: string;
    paramType: string;
    paramValue: string;
    optionAmount?: number;
}

interface componentInfo {
    id: number;
    type: string;
    selectorOptions: Array<selectOptions>;
    customComponent: React.ReactElement<any>;
}

interface Props {
    handleLoadingFinished: (value: boolean)=> void;
    loadingHasFinished: boolean;
}


export default class ProductSelectorBar extends React.Component<Props, State> {
    components: Array<componentInfo> = [
        {
            id: 1, type: 'Sort', selectorOptions: [
                {id: 1, optionName: 'High to low', paramType: 'ordering', paramValue: '-price'},
                {id: 2, optionName: 'Low to high', paramType: 'ordering', paramValue: 'price'},
            ], customComponent: <SelectOneOptionBox/>,
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            haveGotCategories: false,
            activeID: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.createOptionSelect = this.createOptionSelect.bind(this);
    }

    componentDidMount() {
        ProductService.getProductCategoryCount().then(data => {
            let selectOptionsArray: Array<selectOptions> = [];
            let categorySelector: componentInfo = {
                id: 2, type: 'Category', selectorOptions: [], customComponent: <SelectManyOptionBox/>
            };

            Object.entries(data).forEach(([productType, productAmount], index) => {
                let baseCategoryRowInfo: selectOptions =
                    {
                        id: index,
                        optionName: productType,
                        optionAmount: (productAmount as number),
                        paramType: 'product_type',
                        paramValue: productType
                    };
                selectOptionsArray.push(baseCategoryRowInfo);
            });
            categorySelector.selectorOptions = selectOptionsArray;
            this.components.push(categorySelector);
            // this.setState({
            //     haveGotCategories: true
            // });
            this.props.handleLoadingFinished(true);
        }).catch(e => {
            console.log(e.response.data);
        })
    }


    handleClick(id) {
        this.setState({
            activeID: id
        });
    }

    createOptionSelect(selectorInfo) {
        if (selectorInfo.customComponent) {
            return (
                <div key={selectorInfo.id}>
                    <OptionSelector
                        handleClick={this.handleClick}
                        componentId={selectorInfo.id}
                        currentActiveComponentId={this.state.activeID}
                        selectorType={selectorInfo.type}
                        selectorOptions={selectorInfo.selectorOptions}>{selectorInfo.customComponent}</OptionSelector>
                </div>
            )
        } else {
            throw 'Option select must specify custom component'
        }
    }


    render() {
        return (
            <div className="product-selector">
                <div className="product-selector-content">
                    {this.components.map(this.createOptionSelect)}
                </div>
            </div>
        )
    }
}