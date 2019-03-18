import * as React from 'react';
import {productData} from "./ProductPage";
import ProductPageThumbnail from './ProductPageThumbnail';


interface Props {
    productData: productData;
    render: () => void;
}

interface State {
    currentActivePictureSrc: string;
}

export default class GenericProductPageTop extends React.Component<Props, State> {
    state: Readonly<State> = {
        currentActivePictureSrc: this.props.productData.thumbnail,
    };

    constructor(props) {
        super(props);
        this.setCurrentMainPic = this.setCurrentMainPic.bind(this);
    }

    setCurrentMainPic(e: React.MouseEvent<HTMLImageElement>) {
        this.setState({currentActivePictureSrc: e.currentTarget.src})
    }

}


