import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

// setting headerfor requests. In the request object in headers these will appear in every request from the whole application:
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// global, will be shared in all files in the project
// register a new interceptor
// it fires on every request in every files
axios.interceptors.request.use(request => {
    // the request which was sent
    console.log(request);
    // Edit the request config before return. Add headers maybe, etc.
    return request;
}, error => {  // Add error handling function
    // this error is related to sending the request, if fx there is no internet connection. 
    console.log(error);
    // with that we forward to our request in the component, where we can handle it with catch(), if we want to do sg with it locally
    return Promise.reject(error);
});

// new interceptor for handling the responses:
axios.interceptors.response.use(response => {
    console.log(response);
   
    return response;
}, error => {
    console.log(error);
    // we can handle the promise locally
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
