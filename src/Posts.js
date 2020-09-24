import React, { Fragment} from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Link
} from "react-router-dom";

const Posts = ({match}) => {
    const [values, setValues] = useState({
        posts: [],  //State variable to store Posts Data
        skip: 0,    //State variable to store skip post data
        limit: 10,  //State variable to store limit post data
        url: ''
      })
      
    const { posts, skip, limit } = values;

    useEffect(()=> {
        init(); //init function gets called onComponenMount
    },[]);

    const init = () => {
      // to populate post data for userId into the state with useState hook
      axios({
          method: "get",
          url: `https://jsonplaceholder.typicode.com/posts?userId=${match.params.userId}&skip=${skip}&limit=${limit}`
        })
      .then(response => {
        setValues({
          ...values,
          posts: response.data
        })
      })
      .catch((err) => {
        console.log("Something went wrong: Check error trace");
        console.log(err);
      })
    }

    const onNextClick = () => {
      // Updates skip and limit params and populates data again
      setValues({
        ...values,
        skip: skip+10,
        url: `https://jsonplaceholder.typicode.com/posts?userId=${match.params.userId}&skip=${skip}&limit=${limit}`
      })
    }

    return (
        <div className="container">
          <Fragment>
            <h1 className="heading text-center">Posts by user {match.params.userId}</h1>
              <table className='table'>
                <thead>
                  <tr style={{borderRight:"#ececec 1px solid"}}>
                    <th>S.No.</th>
                    <th>Post Name</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((item, index) => (
                    <tr style={{borderRight:"#ececec 1px solid",cursor:"pointer"}} key={index}>
                          <td>{index+1}</td> 
                          <td>
                            <Link to={`/post/${item.id}`} key={index}>
                              {item.title}
                            </Link>
                          </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className='btn btn-sm btn-primary' onClick={onNextClick}>Next</button>
          </Fragment>
        </div>
    )
}

export default Posts;