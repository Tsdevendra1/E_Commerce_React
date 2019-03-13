import {Route, Switch} from "react-router-dom";
import ProductPage from "./Productpage/ProductPage";
import HomePage from "./Homepage/HomePage";
import AddProductPage from "./AddProductPage/AddProductPage";
import LoginPage from "./LoginPage/LoginPage";
import {Redirect} from 'react-router-dom';
import React from 'react';


export const routes = {
    routes: [
        {path: '/', component: HomePage, name: 'Home', exact: true},
        {path: '/products/', component: ProductPage, name: 'Product', exact: false},
        {path: '/add/products/', component: AddProductPage, name: 'Add Product', exact: false},
        {path: '/login/', component: LoginPage, name: 'Login', exact: false},
    ]
};


export function redirectFunction(to){
    for (let route of routes.routes) {
        if (route.name === to) {
            return <Redirect to={route.path}/>
        }
    }
    throw "Path not found when user is authenticated";
}
