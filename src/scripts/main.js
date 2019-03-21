// GENERIC
import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import {store} from './App';

// CSS
import './../styles/appStyles.scss';

// COMPONENTS
import App from './App';
import {getAccessToken} from "./Redux/actions/tokenActions";


// Add a request interceptor
axios.interceptors.response.use(undefined, (error) => {
        if (error.config && error.response && error.response.status === 401) {
            // Dispatch action to get new accessToken and then retry request
            console.log('INSIDE INTERCEPTOR');
            return store.dispatch(getAccessToken(store.getState().jwtToken.refreshToken)).then(() => {
                error.config.headers['Authorization'] = 'Bearer ' + store.getState().jwtToken.accessToken;
                return axios.request(error.config);
            });
        }

        return Promise.reject(error);
    }
);


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

