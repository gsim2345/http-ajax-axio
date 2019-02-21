import axios from 'axios';

// and instance of axios. A copy of the axios object. 
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

// sending requests using this instance we get this other authorization. 
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// We can set up interceptors here as well, just as in the global axios
// instance.interceptors.request...

export default instance;