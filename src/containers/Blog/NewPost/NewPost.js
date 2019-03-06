import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    postDataHandler = () => {
        const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author

        }
        axios.post('/posts/', post)
        .then(response => {
            console.log(response);
            // Redirect replaces the current page on the stack, so can't go back with back button. 
            // so instead of using Redirect, we add the page to history object, so we can go back with the back button.
            // if we use this.props.history.replace, it works like redirect
            // we use Redirect if really just want to redirect the user, if we want to be able to use the back button, use push
            this.props.history.push('/posts');
            
            //this.setState({submitted: true})
        });
    }

    render () {
        let redirect = null;
        //if (this.state.submitted === true)
        // if we submitted the form, redirect to home page
        if (this.state.submitted) {
            redirect = <Redirect to="/posts"/>;
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;