import axios from 'axios';

export const API_URL = 'http://127.0.0.1:8000';
import getCookie from './getCookiesFunction'
import {store} from './App';

export const headers = {
    "X-CSRFToken": getCookie("csrftoken"),
    "Accept": "application/json",
    "Content-Type": "application/json",
};

interface UserCreateData {
    username: string;
    email: string;
    password: string;
}

export default class ProductsService {

    constructor() {
    }

    static createUser(userData: UserCreateData) {
        const url = `${API_URL}/api/user/`;
        return axios({
            method: 'post',
            url: url,
            data: userData,
            headers: headers,
        });
    }

    static createProductImages(imageData: object, accessToken: string) {
        headers['Authorization'] = 'Bearer ' + accessToken;
        const url = `${API_URL}/api/image/`;
        return axios({
            method: 'post', //you can set what request you want to be
            url: url,
            data: imageData,
            headers: headers,
        });
    }

    static createProductCategory(name: string, accessToken: string) {
        headers['Authorization'] = 'Bearer ' + accessToken;
        const url = `${API_URL}/api/productcategories/`;
        let data = {name};
        return axios({
            method: 'post', //you can set what request you want to be
            url: url,
            data: data,
            headers: headers,
        });
    }

    static getProductCategories() {
        let url: string = `${API_URL}/api/productcategories/`;
        return axios.get(url).then(response => response.data);
    }

    static getProductCategoryCount() {
        let url: string = `${API_URL}/api/product/product_type_count`;
        return axios.get(url).then(response => response.data);
    }

    static getProducts(searchParams: string) {
        let url: string = `${API_URL}/api/product/`;
        if (searchParams) {
            url += ('?' + searchParams);
        }
        return axios.get(url).then(response => response.data);
    }

    static getProductsByURL(link) {
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

    static getProduct(pk: number) {
        const url = `${API_URL}/api/product/${pk}/`;
        return axios.get(url).then(response => response.data);
    }

    static deleteProduct(pk: number, accessToken: string) {
        headers['Authorization'] = 'Bearer ' + accessToken;
        const url = `${API_URL}/api/product/${pk}/`;
        return axios({
            method: 'delete', //you can set what request you want to be
            url: url,
            headers: headers,
        });
    }

    static createProduct(productData: object, accessToken: string) {
        headers['Authorization'] = 'Bearer ' + accessToken;
        const url = `${API_URL}/api/product/`;
        return axios({
            method: 'post', //you can set what request you want to be
            url: url,
            data: productData,
            headers: headers,
        });
    }

    static updateProduct(productData: object, pk: number) {
        const url = `${API_URL}/api/product/${pk}/`;
        return axios({
            method: 'patch', //you can set what request you want to be
            url: url,
            data: productData,
            headers: headers,
        });
    }

    static replaceProduct(productData: object, pk: number) {
        const url = `${API_URL}/api/product/${pk}/`;
        return axios({
            method: 'put', //you can set what request you want to be
            url: url,
            data: productData,
            headers: headers,
        });
    }
}


// // EXAMPLE OF REQUEST
// let myData = {
//     "price": 1920
// };
//
// axios({
//     method: 'patch', //you can set what request you want to be
//     url: 'http://127.0.0.1:8000/api/product/1/',
//     data: myData,
//     headers: {
//         "X-CSRFToken": getCookie("csrftoken"),
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//         'Authorization': ' Token ' + 'd3e474c7794ad9b460021d396cda40811c5864b7'
//     }
// })
//     .then(function (response) {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

// Fetch EXAMPLE
// fetch("http://127.0.0.1:8000/api/product/1/", {
//     method: "put",
//     credentials: "same-origin",
//     headers: {
//         "X-CSRFToken": getCookie("csrftoken"),
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//         'Authorization': ' Token ' + 'd3e474c7794ad9b460021d396cda40811c5864b7'
//     },
//     body: JSON.stringify(myData)
// }).then(function (response) {
//     return response.json();
// }).then(function (data) {
//     console.log("Data is ok", data);
// }).catch(function (ex) {
//     console.log("parsing failed", ex);
// });

// let myData = {
//     "product_name": "Product 001",
//     "product_type": "Top",
//     "price": 81,
//     "description": "This is product number 1",
//     "thumbnail": "http://127.0.0.1:8000/media/main/images/image1.jpg",
//     "product_owner": "tsdev"
// };
// ProductService.updateProduct(myData, 1).then(function (response) {
//     console.log(response.data)
// }).catch(function (e) {
//     console.log(e.response.data)
// });

