import * as React from 'react';
import BaseSelectField from "../Forms/BaseSelectField";
import BaseInputField from "../Forms/BaseInputField";
import {connect} from 'react-redux';
import ProductsService from "../ProductService";
import BaseUploadField from "../Forms/BaseUploadField";
import * as ReactDOM from "react-dom";
import {redirectFunction} from "../routers";
import {fetchProductsIfNeeded} from "../Redux/actions/productActions";
import InputWithIcon from "../Forms/InputWithIcon";

interface IaddProductFormProps {
    accessToken: string;
    dispatch: any;
}

interface showCaseImages {
    showcaseImage1: any;
    showcaseImage2?: any;
    showcaseImage3?: any;
    showcaseImage4?: any;
}

interface productFormFields {
    product_name: string;
    product_type: number | null;
    price: string;
    description: string;
    thumbnail: any;
}

export interface optionInterface {
    id: number;
    name: string;
}

interface IaddProductFormState extends productFormFields, showCaseImages {
    isSending: boolean;
    numExtraImages: number;
    productCategories: Array<optionInterface>;
    addModalValue: string;
}


class AddProductForm extends React.Component<IaddProductFormProps, IaddProductFormState> {

    imageUploadRef: React.RefObject<HTMLInputElement>;
    addModalRef: React.RefObject<HTMLInputElement>;


    constructor(props) {
        super(props);
        this.imageUploadRef = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addImageInput = this.addImageInput.bind(this);
        this.addNewShowcaseImageInput = this.addNewShowcaseImageInput.bind(this);
        this.addModalRef = React.createRef();
        this.hideAddModal = this.hideAddModal.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.addCategory = this.addCategory.bind(this);
    }

    state: Readonly<IaddProductFormState> = {
        product_name: '',
        product_type: null,
        price: '',
        addModalValue: '',
        description: '',
        thumbnail: '',
        isSending: false,
        showcaseImage1: '',
        numExtraImages: 0,
        productCategories: [],
    };


    componentDidMount() {
        this.setProductCategories();
    }

    setProductCategories() {
        ProductsService.getProductCategories().then(data => {
            console.log(data);
            // For product_type we set whatever is first as default value
            if (this.props.accessToken) {
                this.setState({productCategories: data, product_type: data[0].id})
            }
        }).catch(e => {
            console.log(e.response.data);
        })
    }

    handleInputChange(event) {
        const target = event.currentTarget;
        let value;
        console.log(target.type);
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
                    // Set first productCategory as default
                    [field]: this.state.productCategories[0].id,
                })
            } else if (field !== 'isSending' && field !== 'productCategories') {
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
        ProductsService.createProduct(data, this.props.accessToken).then(data => {
            console.log(data);
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

    hideAddModal() {
        if (this.addModalRef.current) {
            this.addModalRef.current.style.display = 'none';
            (document.getElementsByClassName('overlay')[0] as HTMLDivElement).style.display = 'none';
            this.setState({addModalValue: ''});
        }
    }

    showAddModal() {
        if (this.addModalRef.current) {
            this.addModalRef.current.style.display = 'block';
            (document.getElementsByClassName('overlay')[0] as HTMLDivElement).style.display = 'block';
        }
    }

    addCategory() {
        let input = (document.getElementById('add-category-input') as HTMLInputElement);
        ProductsService.createProductCategory(input.value, this.props.accessToken).then(data => {
            console.log(data);
            this.setProductCategories();
            this.hideAddModal();
        }).catch(e => {
            console.log(e);
        });
    }

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
        console.log(this.state.addModalValue);
        let addExtraImagesButtonClasses = 'btn mt-3';
        if (this.state.numExtraImages === 3) {
            addExtraImagesButtonClasses += ' btn-danger'
        } else {
            addExtraImagesButtonClasses += ' btn-success'
        }
        return (
            <form method="post" className="custom-form">
                <div className="overlay"></div>
                <div ref={this.addModalRef} className="add-category-modal">
                    <div className="add-header">
                        <span>
                        Add Category
                        </span>
                        <span>
                            <i onClick={this.hideAddModal} className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="add-category-content">
                        <label className="base-field">
                            <span className="mb-2">
                            Category name:
                            </span>
                            <input className="base-input-class" type="text" id="add-category-input" name="addModalValue"
                                   onChange={this.handleInputChange} value={this.state.addModalValue}
                                   placeholder="Enter category name..."/>
                        </label>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <button disabled={!(this.state.addModalValue !== '')} onClick={this.addCategory}
                                    type="button" className="btn btn-primary">Submit
                            </button>
                        </div>
                    </div>
                </div>
                <BaseInputField type="text" label="Product Name" name="product_name" inputClasses="base-input-class"
                                inputValue={this.state.product_name}
                                placeholder="Enter product name..."
                                onChangeFunction={this.handleInputChange}/>
                <BaseInputField type="number" label="Product Price (£)" name="price" inputValue={this.state.price}
                                inputClasses="base-input-class"
                                placeholder="Enter product price..."
                                onChangeFunction={this.handleInputChange}/>
                <BaseInputField type="text" label="Product Description" name="description"
                                inputClasses="base-input-class"
                                inputValue={this.state.description}
                                placeholder="Enter product description..."
                                onChangeFunction={this.handleInputChange}/>
                <BaseUploadField onChangeFunction={this.handleInputChange} innerRef={this.imageUploadRef}
                                 name="thumbnail" label="Product Thumbnail"/>
                {(this.state.productCategories && this.state.product_type) &&
                <BaseSelectField selectClasses="base-input-class" showModalFunc={this.showAddModal}
                                 options={this.state.productCategories}
                                 label="Product Type" name="product_type"
                                 inputValue={this.state.product_type}
                                 onChangeFunction={this.handleInputChange}/>
                }
                <label className="thumbnails label-class" style={{marginTop: '10px'}}>
                    <span className="base-label-class">
                    Images to Showcase:
                    </span>
                    <input onChange={this.handleInputChange}
                           className="showimage thumbnail-image-field mb-1"
                           type="file" name="showcaseImage1"/>
                    {
                        inputIds.map(this.addNewShowcaseImageInput)
                    }
                    <button className={addExtraImagesButtonClasses} style={{maxWidth: '207px'}}
                            disabled={this.state.numExtraImages === 3} type="button" onClick={this.addImageInput}>
                        {/*Add Extra Image*/}
                        {this.state.numExtraImages === 3 ? <span>No More Images</span> : <span>Add Extra Image</span>}
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
