import React, { Component,Suspense } from 'react';
// with lazy loading we want to load it only when needed, not immediately import. 
// we import in a different way
//import NewPost from './NewPost/NewPost';
import Posts from './Posts/Posts';
import './Blog.css';
import {Route, NavLink, Switch, Redirect } from 'react-router-dom';

//import asyncComponent from '../../hoc/asyncComponent';

/*
const asyncNewPost = asyncComponent( () => {
    // dynamic import syntax. Whatever comes between the parentheses, will only be imported when this function gets executed. And that will only be executed, when asyncNewPost will be rendered 
    return import('./NewPost/NewPost');
});*/

const NewPost = React.lazy(() => import('./NewPost/NewPost'));


class Blog extends Component {

    state = {
        auth: true
    }

    render () {
        return (
            // Link to="/" - the to property is like path, but handles event.preventDefault as well. On Click it won't take you to the link. Can configure with params where the link takes us.
            // The NavLink component add a 'class="acive"' to the active link
            // with activeClassName we can define the active class name ourselves
            // activeStyle add inline styling
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                            to="/posts/" 
                            exact 
                            activeClassName="active"
                            activeStyle={{
                                color: '#fa923f',
                                textDecoration: 'underline'
                            }}
                            >Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post",
                                // in case you want to attach the path to the current url:
                                //pathname: this.props.match.url + '/new-post'
                                //hash: #submit - fx. it jumps to that part
                                //search:'?quick-submit=true' - fx. query params
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path="/" exact render={() => <h1>Home</h1>}/>
                <Route path="/" render={() => <h1>Home 2</h1>}/>*/}
                
                {/* If we are not using switch, all of the routes that fits get loaded at once. Fx. if we have "/courses", and "courses/course", both gets loaded, not only the one. */}
                <Switch>
                    {/* A Guard - for security reasons (child components get their componentDidMount earlier, and maybe are reaching out to web, or do something else we don't want) the guard at rendering (here) is preferable. */}
                    {this.state.auth ? 
                    <Route 
                        path="/new-post" 
                        render={() => (
                            <Suspense fallback={<div>Loading...</div>}>
                                <NewPost />
                            </Suspense>)}
                    /> 
                    : null}

                    {/*<Route path="/new-post" component={(props) => <NewPost {...props} auth={this.state.auth} />} /> */}
                    {/* If the auth is false, goes to the next one that passes, which is Redirect, so it gets redirected to /posts*/}
                    <Route path="/posts" component={Posts}/>


                    {/* Redirect is already handling 404 - unknown routes*/}
                    {/*<Redirect from="/" to="/posts"/> */}
                    {/* OR: At 404 - unknown routes - simply leave out the path: (Both won't work together though. Either "/" or without path, because both catches all. )*/}
                    {/* <Route component={Posts}/> */}
                    {/* OR render sg for any unknow routes - has to come as last */}
                    <Route render={() => <h1>Not found</h1>}/>

                    {/* We can use from in redirect only in the switch statement*/}
                </Switch>
                {/* We remove exact from "/" path, so the nested route in the Posts can work (otherwise will never render, it stops at "/") */}
                {/* If we remove exact, "/new-post" has to come first */}
                
            </div>
            // exact is a boolian property, and defines that we want the exact path "/", because by default it's first character, so everything that starts with "/" will be routed here
            // with exact, it will only be rendered to path="/"
            // without exact it will be rendered to every path that starts with "/"
        );
    }
}

export default Blog;