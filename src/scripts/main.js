// GENERIC
import React from "react";
import ReactDOM from "react-dom";

// CSS
import './../styles/appStyles.scss';

// COMPONENTS
import App from './App';

// if (module.hot) {
//     module.hot.accept('', function () {
//         // Do something with the updated library module...
//         console.log('hi');
//     });
// }

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

