import * as React from 'react';
import BaseSelectField from "../Forms/BaseSelectField";
import BaseInputField from "../Forms/BaseInputField";
import {connect} from 'react-redux';
import ProductsService from "../ProductService";
import BaseUploadField from "../Forms/BaseUploadField";
import * as ReactDOM from "react-dom";
import {redirectFunction} from "../routers";

interface IaddProductFormProps {
    accessToken: string;
}

interface showCaseImages {
    showcaseImage1: any;
    showcaseImage2?: any;
    showcaseImage3?: any;
    showcaseImage4?: any;
}

interface productFormFields {
    product_name: string;
    product_type: string;
    price: string;
    description: string;
    thumbnail: any;
}


interface IaddProductFormState extends productFormFields, showCaseImages {
    isSending: boolean;
    numExtraImages: number;
}


class AddProductForm extends React.Component<IaddProductFormProps, IaddProductFormState> {

    product_type_default = 'Top';
    imageUploadRef: React.RefObject<HTMLInputElement>;


    constructor(props) {
        super(props);
        this.imageUploadRef = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addImageInput = this.addImageInput.bind(this);
        this.addNewShowcaseImageInput = this.addNewShowcaseImageInput.bind(this);
    }

    readonly state: IaddProductFormState = {
        product_name: '',
        product_type: this.product_type_default,
        price: '',
        description: '',
        thumbnail: '',
        isSending: false,
        showcaseImage1: '',
        numExtraImages: 0,
    };

    handleInputChange(event) {
        const target = event.target;
        let value;
        if (target.type === 'checkbox') {
            value = target.checked
        } else if (target.type === 'file') {
            value = target.files[0];
        } else {
            value = target.value;
        }
        let name = target.name;
        this.setState({[name]: value} as any);
    }

    resetForm() {
        // Set all fields to default value
        for (let field in this.state) {
            if (field === 'product_type') {
                this.setState({
                    [field]: this.product_type_default,
                })
            } else if (field !== 'isSending') {
                this.setState({
                    [field]: ''
                } as any)
            }
        }
        let inputFields = (ReactDOM.findDOMNode(this) as Element).getElementsByTagName('input');
        // Reset all input file fields
        for (let field of inputFields) {
            if (field.type === 'file') {
                field.value = '';
            }
        }
    }

    handleFormSubmit() {
        const {product_name, description, thumbnail, price, product_type, showcaseImage1, showcaseImage2, showcaseImage3, showcaseImage4} = this.state;

        let productFieldValues = {
            product_name,
            description,
            thumbnail,
            price,
            product_type,
            showcaseImage1, showcaseImage2, showcaseImage3, showcaseImage4
        };

        const data = new FormData();
        for (let field in productFieldValues) {
            data.append(field, productFieldValues[field]);
        }

        // We are about to send the data
        this.setState({
            isSending: true,
        });
        ProductsService.createProduct(data, this.props.accessToken).then(response => {
            console.log(response.data);

            //     const productId = response.data.id;
            //
            //     const {showcaseImage1, showcaseImage2, showcaseImage3, showcaseImage4} = this.state;
            //
            //     const imageData = {
            //         showcaseImage1,
            //         showcaseImage2,
            //         showcaseImage3,
            //         showcaseImage4,
            //     };
            //
            //     let createImageForm = function (productId, image) {
            //         const data = new FormData();
            //         data.append('picture', image);
            //         data.append('product', productId);
            //         return data
            //     };
            //
            //
            //     let imagePromises: any = [];
            //     for (let image in imageData) {
            //         if (image) {
            //             let imageForm = createImageForm(productId, image);
            //             imagePromises.push(ProductsService.createProductImages(imageForm, this.props.accessToken));
            //         }
            //     }
            //
            //
            //     return Promise.all(imagePromises);
            // }).then(response => {
            //     console.log(response);
            this.resetForm();
        }).catch(e => {
            if (e.response) {
                console.log(e.response.data);
            }
        }).then(() => {
            // After everything set not sending
            this.setState({
                isSending: false,
            });
        });
    }

    validateDataFilled() {
        let atLeastOneShowImageCompleted = false;

        for (let input of (document.getElementsByClassName('showimage') as HTMLCollectionOf<HTMLInputElement>)) {
            if (input.files && input.files[0]) {
                atLeastOneShowImageCompleted = true;
                break
            }
        }
        return (this.state.product_name.length > 0 &&
            this.state.description.length > 0 &&
            this.state.price.length > 0 &&
            this.state.thumbnail !== '' && atLeastOneShowImageCompleted);
    }

    addImageInput() {
        // Only allow max of 3 extra images
        if (this.state.numExtraImages < 3) {
            this.setState({numExtraImages: (this.state.numExtraImages + 1)});
        }
    }

    addNewShowcaseImageInput(numberForm) {
        return (
            <input onChange={this.handleInputChange} key={numberForm} className="showimage thumbnail-image-field my-1"
                   type="file"
                   name={`showcaseImage${numberForm}`}/>
        )
    };

    render() {
        if (!this.props.accessToken) {
            return redirectFunction('Login');
        }
        // TODO: Pretty sure this is bad practice
        const inputIds: Array<number> = [];
        let beginningId = 2;
        for (let i = 0; i < this.state.numExtraImages; i++) {
            inputIds.push(beginningId);
            beginningId++;
        }
        return (
            <form method="post" className="custom-form">
                <BaseInputField type="text" label="Product Name" name="product_name"
                                inputValue={this.state.product_name}
                                onChangeFunction={this.handleInputChange}/>
                <BaseInputField type="number" label="Product Price (£)" name="price" inputValue={this.state.price}
                                onChangeFunction={this.handleInputChange}/>
                <BaseInputField type="text" label="Product Description" name="description"
                                inputValue={this.state.description}
                                onChangeFunction={this.handleInputChange}/>
                <BaseUploadField onChangeFunction={this.handleInputChange} innerRef={this.imageUploadRef}
                                 name="thumbnail" label="Product Thumbnail"/>
                <BaseSelectField options={['Top', 'Bottom']} label="Product Type" name="product_type"
                                 inputValue={this.state.product_type}
                                 onChangeFunction={this.handleInputChange}/>
                <label className="thumbnails label-class">
                    Images to Showcase:
                    <input onChange={this.handleInputChange} className="showimage thumbnail-image-field mb-1"
                           type="file" name="showcaseImage1"/>
                    {
                        inputIds.map(this.addNewShowcaseImageInput)
                    }
                    <button disabled={this.state.numExtraImages === 3} type="button" onClick={this.addImageInput}>Add
                        Image
                    </button>
                </label>
                <button disabled={!this.validateDataFilled()} onClick={this.handleFormSubmit} type="button"
                        className="form-item btn btn-primary">
                    {this.state.isSending ?
                        <i id="spinner" className="fas fa-spinner fa-spin"></i> : <span>Submit</span>
                    }
                </button>
            </form>
        )
    }
}


function mapStateToProps(state) {
    const {jwtToken} = state;
    const {accessToken} = jwtToken;
    return {
        accessToken
    }
}

export default connect(mapStateToProps)(AddProductForm);
