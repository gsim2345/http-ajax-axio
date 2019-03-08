import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';

import Blog from './containers/Blog/Blog';

// https://jsonplaceholder.typicode.com/
class App extends Component {
  render() {
    return (
      // the server needs to be configured, that it always forwards requests, and the router handles the request, even if it's 404
      //if we are serving the server from a subdirectory, and not only from "/", it needs to be set in the router:
      //<BrowserRouter basename="/my-app">
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
