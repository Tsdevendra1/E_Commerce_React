import './../styles/appStyles.scss';
import React from "react";
import ReactDOM from "react-dom";
import HomePage from './Homepage/HomePage'
import GenericPage from './GenericPage'
import ProductPage from "./Productpage/ProductPage";
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import routes from './routers';

// // Function checks for the page type to run page specific js.
// function checkPageType(pageName) {
//     let body = document.getElementsByTagName('body')[0];
//     let pageType = body.getAttribute('data-page');
//     // console.log(pageName);
//     // console.log(body);
//     // console.log(pageType);
//     return pageType.includes(pageName);
// }
//
//
//
// // FOR: HOMEPAGE
// if (checkPageType('homepage')) {
//     ReactDOM.render(
//         <GenericPage><HomePage/></GenericPage>,
//         document.getElementById('root')
//     );
// } else if (checkPageType('productpage')) {
//     ReactDOM.render(
//         <GenericPage><ProductPage/></GenericPage>,
//         document.getElementById('root')
//     );
// } else {
//     alert('not found');
// }


function createRoutes(routeInfo) {

    return (
        <Route key={routeInfo.name} exact={routeInfo.exact} path={routeInfo.path} component={routeInfo.component}/>
    )
}

function createRouter() {
    return (
        <BrowserRouter>
            <GenericPage>
                <Switch>
                    {routes.routes.map(createRoutes)}
                </Switch>
            </GenericPage>
        </BrowserRouter>
    )
}


ReactDOM.render(
    createRouter(),
    document.getElementById('root')
);

