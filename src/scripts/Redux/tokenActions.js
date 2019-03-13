import axios from 'axios';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECIEVE_TOKEN = 'RECIEVE_TOKEN';
import {API_URL, headers} from '../ProductService';

function requestToken() {
    return {
        type: REQUEST_TOKEN,
    }
}

function receieveToken(data) {
    return {
        type: RECIEVE_TOKEN,
        refreshToken: data.refresh,
        accessToken: data.access,
        receivedAt: Date.now()
    }
}

export default function fetchToken(username, password) {
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
