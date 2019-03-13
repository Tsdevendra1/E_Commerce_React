import axios from 'axios';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECIEVE_TOKEN = 'RECIEVE_TOKEN';
export const RECIEVE_ACCESS_TOKEN = 'RECIEVE_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const RESET_REFRESH_TOKEN = 'RESET_REFRESH_TOKEN';

import {API_URL, headers} from '../../ProductService';

export function setRefreshToken(refreshToken) {
    return {
        type: SET_REFRESH_TOKEN,
        refreshToken,
    }
}

export function resetRefreshToken() {
    localStorage.removeItem('refreshToken');
    return {
        type: RESET_REFRESH_TOKEN,
    }
}

export function getAccessToken(refreshToken) {
    let data = {
        refresh: `${refreshToken}`,
    };
    return dispatch => {
        return axios.post(`${API_URL}/api/token/refresh/`, data, headers).then(function (response) {
            // If successful save the refresh token
            dispatch(setRefreshToken(refreshToken));
            dispatch(receieveAccessToken(response.data));
        }).catch(function (error) {
            console.log(error.response.data);
            dispatch(resetRefreshToken());
        });
    }
}

function receieveAccessToken(data) {
    return {
        type: RECIEVE_ACCESS_TOKEN,
        accessToken: data.access,
    }
}

function requestToken() {
    return {
        type: REQUEST_TOKEN,
    }
}

function receieveToken(data) {
    // Save refresh token in localStorage
    localStorage.setItem("refreshToken", data.refresh);
    return {
        type: RECIEVE_TOKEN,
        refreshToken: data.refresh,
        accessToken: data.access,
        receivedAt: Date.now()
    }
}

export function fetchToken(username, password) {
    return dispatch => {
        dispatch(requestToken());
        let data = {username: username, password: password};
        return axios.post(`${API_URL}/api/token/`, data, headers).then(function (response) {
            dispatch(receieveToken(response.data))
        }).catch(function (e) {
            console.log(e.response.data)
        });
    }
}
