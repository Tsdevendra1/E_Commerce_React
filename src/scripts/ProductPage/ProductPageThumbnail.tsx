import * as React from 'react';


interface Props {
    thumbnail: string
    // setParentState: (e: React.MouseEvent<HTMLImageElement>) => void;
}

export default class ProductPageThumbnail extends React.Component<Props, {}> {
    render() {
        return (
            <div className="aspect-ratio-box">
                <div className="aspect-ratio-box-inside">
                    <img className="product-page-image" src={this.props.thumbnail}/>
                    {/*<img onClick={this.props.setParentState} className="product-page-image" src={this.props.thumbnail}/>*/}
                </div>
            </div>
        )
    }
}
