// GENERIC
import React from "react";
import ReactDOM from "react-dom";

// CSS
import './../styles/appStyles.scss';

// COMPONENTS
import HomePage from './Homepage/HomePage'
import GenericPage from './GenericPage'
import ProductPage from "./Productpage/ProductPage";

// ROUTES
import routes from './routers';
import {Switch, Route, BrowserRouter} from 'react-router-dom'

// REDUX
import {Provider} from 'react-redux';
import configureStore from './Redux/configureStore';


const store = configureStore();


function createRoutes(routeInfo) {

    return (
        <Route key={routeInfo.name} exact={routeInfo.exact} path={routeInfo.path} component={routeInfo.component}/>
    )
}

function createRouter() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <GenericPage>
                    <Switch>
                        {routes.routes.map(createRoutes)}
                    </Switch>
                </GenericPage>
            </BrowserRouter>
        </Provider>
    )
}


ReactDOM.render(
    createRouter(),
    document.getElementById('root')
);

