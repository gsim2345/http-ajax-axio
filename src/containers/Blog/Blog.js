import React, { Component } from 'react';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import './Blog.css';
import {Route, NavLink, Switch, Redirect } from 'react-router-dom';


class Blog extends Component {

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
                
                <Switch>
                    <Route path="/new-post" component={NewPost}/>   
                    <Route path="/posts" component={Posts}/>
                    <Redirect from="/" to="/posts"/>
                    {/* We can use from in redirect only in the switch statement*/}
                    {/*<Route path="/" component={Posts}/>*/}
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