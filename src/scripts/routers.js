import {Route, Switch} from "react-router-dom";
import ProductPage from "./Productpage/ProductPage";
import HomePage from "./Homepage/HomePage";
import AddProductPage from "./AddProductPage/AddProductPage";

export default {
    routes: [
        {path: '/', component: HomePage, name: 'Home', exact: true},
        {path: '/products/', component: ProductPage, name: 'Product', exact: false},
        {path: '/add/products/', component: AddProductPage, name: 'Add Product', exact: false},
    ]
}

