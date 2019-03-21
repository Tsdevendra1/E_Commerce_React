// ./containers/App.js
import React from 'react'
import {hot} from 'react-hot-loader'
import {routes} from './routers';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import GenericPage from './GenericPage'

// REDUX
import configureStore from './Redux/configureStore';

export const store = configureStore();

function createRoutes(routeInfo) {
    return (
        <Route key={routeInfo.name} exact={routeInfo.exact} path={routeInfo.path} component={routeInfo.component}/>
    )
}

function App() {
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

export default hot(module)(App)
