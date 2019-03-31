import {Route, Switch} from "react-router-dom";
import ProductListPage from "./ProductListPage/ProductListPage";
import HomePage from "./Homepage/HomePage";
import AddProductPage from "./AddProductPage/AddProductPage";
import ProductPage from "./ProductPage/ProductPage";
import LoginPage from "./LoginPage/LoginPage";
import {Redirect} from 'react-router-dom';
import React from 'react';
import CheckoutPage from './CheckoutPage/CheckoutPage';
import OwnProductListPage from './OwnProductListPage/OwnProductListPage';


export const routes = {
    routes: [
        {path: '/', component: HomePage, name: 'Home', exact: true, show: true},
        {path: '/products/', component: ProductListPage, name: 'New Items', exact: true, show: true},
        {path: '/add/products/', component: AddProductPage, name: 'Add Product', exact: false, show: true},
        {path: '/login/', component: LoginPage, name: 'Login', exact: false, show: false},
        {path: '/checkout/', component: CheckoutPage, name: 'Checkout', exact: false, show: false},
        {path: '/products/self/', component: OwnProductListPage, name: 'Your Products', exact: false, show: true},
        {path: '/products/:id', component: ProductPage, name: 'Product Page', exact: false, show: false},
    ]
};


export function redirectFunction(to) {
    for (let route of routes.routes) {
        if (route.name === to) {
            return <Redirect to={route.path}/>
        }
    }
    throw "Path not found when user is authenticated";
}
