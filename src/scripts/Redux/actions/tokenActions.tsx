import axios from 'axios';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECIEVE_TOKEN = 'RECIEVE_TOKEN';
export const RECIEVE_ACCESS_TOKEN = 'RECIEVE_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
export const RESET_REFRESH_TOKEN = 'RESET_REFRESH_TOKEN';

import {API_URL, headers, default as ProductsService} from '../../ProductService';

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

export function getAccessToken(refreshToken: string) {
    // This function is called on first page load;
    let data = {
        refresh: `${refreshToken}`,
    };
    console.log('getting access token');
    return dispatch => {
        let refreshTokenExpireTime = localStorage.getItem("refreshTokenExpire");
        let extraHoursBeforeExpire = 4;
        // If the token will expire within 4 hours, reset the refreshtoken
        if ((refreshTokenExpireTime && (parseInt(refreshTokenExpireTime) <= (new Date().getTime() + (60 * 60 * 1000 * extraHoursBeforeExpire)))) || !refreshTokenExpireTime) {
            dispatch(resetRefreshToken());
        } else {
            return axios.post(`${API_URL}/api/token/refresh/`, data, {headers}).then(function (response) {
                // If successful save the refresh token
                dispatch(setRefreshToken(refreshToken));
                dispatch(receieveAccessToken(response.data));
            }).catch(function (error) {
                console.log(error.response.data);
                dispatch(resetRefreshToken());
            });
        }
    }
}

function receieveAccessToken(data: any): object {
    return {
        type: RECIEVE_ACCESS_TOKEN,
        accessToken: data.access,
    }
}

function requestToken(): object {
    return {
        type: REQUEST_TOKEN,
    }
}

function receieveToken(data: any): object {
    // Save refresh token in localStorage
    localStorage.setItem("refreshToken", data.refresh);
    localStorage.setItem("refreshTokenExpire", `${(new Date()).getTime() + (60 * 60 * 24 * 1000)}`);
    return {
        type: RECIEVE_TOKEN,
        refreshToken: data.refresh,
        accessToken: data.access,
        receivedAt: Date.now()
    }
}

export function fetchToken(username: string, password: string, dispatchRequestToken = true): (dispatch: any) => Promise<void> {
    return dispatch => {

        if (dispatchRequestToken) {
            dispatch(requestToken());
        }
        let data = {username: username, password: password};
        return axios.post(`${API_URL}/api/token/`, data, {headers}).then(function (response) {
            console.log(response.data);
            dispatch(receieveToken(response.data))
        }).catch(function (e) {
            console.log(e.response.data)
        });
    }
}

export function createUser(username: string, email: string, password: string) {
    return dispatch => {
        dispatch(requestToken());
        let data = {username, email, password};
        ProductsService.createUser(data).then(data => {
            console.log(data);
            dispatch(fetchToken(username, password, false))
        });
    }
}
