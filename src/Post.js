import React, {Fragment} from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Posts = ({match}) => {
    //accepting match object as a prop from React Router
    const [values, setValues] = useState({
        postData: {}, //State variable to store Post Data
        comments: []  //State variable to store Comment Data
      })
      
    const {postData, comments} = values;
    useEffect(()=> {
        init(); //init function gets called onComponenMount 
    },[]);     


    const init = () => {
      // to populate post data by postId into the state with useState hook
      axios({
          method: "get",
          url: `https://jsonplaceholder.typicode.com/posts/${match.params.postId}`
        })
        .then(response => {
          setValues({
            ...values,
            postData: response.data,
          })
        })
        .catch((err) => {
            console.log("Something went wrong: Check error trace");
            console.log(err);
        })
    }

    const onCommentClick = () =>{
      // Calls comments API and populates comments data into the State
      axios({
        method: "get",
        url: `https://jsonplaceholder.typicode.com/posts/${match.params.postId}/comments`
      })
      .then(comments => {
        setValues({
          ...values,
          comments : comments.data
        })
      })
    }

    const onDeletetClick = () => {
      // Calls API with Delete method and gets redirected to Landing page
      axios({
        method: "DELETE",
        url: `https://jsonplaceholder.typicode.com/posts/${match.params.postId}`
      })
      .then(data => {
        console.log(`Post Deleted at URL ${data.config.url}`)
      })
      .catch((err) => {
        console.log("Something went wrong: Check error trace");
        console.log(err);
      })
    }

    return (
      <div className="container my-5">
        <Fragment>
          <h1>Post Details</h1>
          <h3>{postData.title}</h3>
          <p>{postData.body}</p>
          <button className='btn btn-primary' onClick={onCommentClick}>Comment</button>
          
          <Link to='/'>
            <button className='btn btn-danger ml-2' onClick={() => {onDeletetClick()}}>Delete</button>
          </Link>

          { 
            comments.length !== 0 &&
              <ul>
              <h3>Comments</h3>
                {comments.map((comment, index) => (
                  <li key={index}><b>{comment.email}</b> - {comment.body}</li>
                ))}
              </ul>
          }
        </Fragment>
      </div>
    )
}

export default Posts;