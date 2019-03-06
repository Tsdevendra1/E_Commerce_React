import './../styles/appStyles.scss';
import React from "react";
import ReactDOM from "react-dom";
import HomePage from './Homepage/HomePage'
import GenericPage from './GenericPage'


// Function checks for the page type to run page specific js.
function checkPageType(pageName) {
    return document.getElementsByTagName('body')[0].getAttribute('data-page').includes(pageName);
}


// FOR: HOMEPAGE
if (checkPageType('homepage')) {
    ReactDOM.render(
        <GenericPage><HomePage/></GenericPage>,
        document.getElementById('root')
    );
} else {
    alert('not found');
}



