import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    // we turn componentDidUpdate to componentDidMount, as we don't updating anymore, just getting added or removed from DOM
    componentDidMount() {
        // in props we can see the route params
        console.log(this.props);
        // we extract the id from the route params:
        if (this.props.match.params.id) {
            // if no data in loadedpost, or if there is already some data in loadedPost, and the id is not the same as earlier id
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id)) {
                axios.get('/posts/'+ this.props.match.params.id)
            .then(response => {
                //console.log(response);
                this.setState({loadedPost: response.data});
            });
            }
            
        }

        // Example retreiving query params: 
        // the search string: props.location.search
        // const query = new URLSearchParams(this.props.location.search);
        /* for (let param of query.entries()) {
            console.log(param); // yields ['start', '5']
        } */
        

    deletePostHandler = () => {
        axios.delete('/posts/'+ this.props.id)
        .then(response => {
            console.log(response);
        });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        //if this.props.id returns true
        if(this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }
        
        // if the data arrived from the ajax request to the state
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        
        return post;
    }
}

export default FullPost;