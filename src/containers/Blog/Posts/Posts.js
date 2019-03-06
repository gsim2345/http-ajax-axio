import React, { Component} from 'react';
// import our axios instance
import axios from '../../../axios';
import { Route } from 'react-router-dom';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
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
        // instead of state navigate programmatically
        // the same as adding the link
        this.props.history.push({pathname: '/posts/' + id});
        //this.props.history.push('/posts/' + id);
    }


    render() {
        let posts = <p style={{textAlign: 'center'}}
        >Something went wrong!</p>;
        // if error is false
        console.log(this.props.match.url);
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    //moved key from Post element to Link, as it has to be at the outer element
                //<Link to={'/posts/' + post.id} key={post.id}>
                <Post 
                    key={post.id}
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}/>
                //</Link>
                )
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/* nested route component, path set dynamically*/}
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        )
    }
}

export default Posts;

