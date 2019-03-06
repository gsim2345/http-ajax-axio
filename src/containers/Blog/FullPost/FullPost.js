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

        this.loadData();
    }


    // if we are loading a component that we already loaded, it won't rerender the whole component, (like here with Fullpost, if we already rendered once, won't be rendered again), so componentDidMount won't run again, so we won't send a new request for the server. 
    // instead use  componentDidUpdate(), that will be executed again
    // we call loadData in both 
    // IF WE USE ROUTING, ALWAYS NEEDS TO USE THAT, because it won't mount the component again.
    componentDidUpdate() {
        this.loadData();
    }

    deletePostHandler = () => {
        axios.delete('/posts/'+ this.props.match.params.id)
        .then(response => {
            console.log(response);
        });
    }

    loadData() {
        // we extract the id from the route params:
        if (this.props.match.params.id) {
            // if no data in loadedpost, or if there is already some data in loadedPost, and the id is not the same as earlier id
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) {
                // we need to switch to != because this.props.match.params.id is a string, and the other is a number OR we leave the strict equality, and turn this.props.match.params.id into an integer with + in front of
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
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        //if this.props.id returns true
        if(this.props.match.params.id) {
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