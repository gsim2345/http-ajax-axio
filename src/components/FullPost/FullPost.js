import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    // we want to update whenever we get new props
    componentDidUpdate() {
        if (this.props.id) {
            // if no data in loadedpost, or if there is already some data in loadedPost, and the id is not the same as earlier id
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('https://jsonplaceholder.typicode.com/posts/'+ this.props.id)
            .then(response => {
                //console.log(response);
                this.setState({loadedPost: response.data});
            });
            }
            
        }
        
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
                        <button className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        
        return post;
    }
}

export default FullPost;