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

export function wrapComponentWithClass(WrappedComponent:JSX.Element, wrappingClass:string, onClickFunction: (e:any)=>any) {
    return (
        <div className={wrappingClass} onClick={onClickFunction}>
            {WrappedComponent}
        </div>
    )
}

export default class GenericProductPageTop extends React.Component<Props, State> {
    state: Readonly<State> = {
        currentActivePictureSrc: '',
    };

    componentDidMount() {
        this.setState({currentActivePictureSrc: this.props.productData.thumbnail})
    }

    componentDidUpdate(prevProps) {
        if (this.props.productData.id !== prevProps.productData.id) {
            this.setState({currentActivePictureSrc: this.props.productData.thumbnail})
        }
    }

    constructor(props) {
        super(props);
        this.setCurrentMainPic = this.setCurrentMainPic.bind(this);
    }

    setCurrentMainPic(e: React.MouseEvent<HTMLImageElement>) {
        console.log(e.currentTarget);
        let elems = document.getElementsByClassName('active-pic');
        console.log(elems);
        for (let el of elems){
            el.classList.remove("active-pic");
        }
        e.currentTarget.classList.add('active-pic');
        let image = (e.currentTarget.querySelector('img') as HTMLImageElement);
        this.setState({currentActivePictureSrc: image.src})
    }

}


