import React, { Component} from 'react';
// import our axios instance
import axios from '../../../axios';
import { Link } from 'react-router-dom';
import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/posts')
            .then(response => {
                // Use only the first 4 data
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: "Max"
                    }
                })
                this.setState({posts: updatedPosts});
                //console.log(response);
            })
            .catch(error => {
                //console.log(error);
                this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }


    render() {
        let posts = <p style={{textAlign: 'center'}}
        >Something went wrong!</p>;
        // if error is false
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    //moved key from Post element to Link, as it has to be at the outer element
                <Link to={'/' + post.id} key={post.id}>
                    <Post 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}/>
                </Link>)
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;

