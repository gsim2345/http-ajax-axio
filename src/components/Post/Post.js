import React from 'react';
import { withRouter } from 'react-router-dom';

import './Post.css';

const post = (props) => {
    // routing related props are not passed down the component three
    console.log(props);
    return(
        <article className="Post" onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
    )
}
    
export default withRouter(post);