import React, {Fragment} from 'react';
import { Table, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Link
} from "react-router-dom";

const App = () => {
  const [values, setValues] = useState({
    users: [] //State variable to store Users Data
  })
  
  const {users} = values;
  
  useEffect(()=> {
    init(); //init function gets called onComponenMount
  },[]);

  const init = () => {
    // to populate users data into the state with useState hook
    axios({
      method: "get",
      url: `https://jsonplaceholder.typicode.com/users`
    })
    .then(users => {
      setValues({
        ...values,
        users: users.data
      })
    })
    .catch((err) => {
      console.log("Something went wrong: Check error trace");
      console.log(err);
    })
  }

  return(
    <Fragment>
      <div className='container '>
          <h1 className="heading text-center mx-5">All Posts</h1>
          <Table className='text-left mx-5'>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Blog Posts</th>
              </tr>
              {users.map((item, index) => (
                <tr key={index}>
                  <td style={{color:"#007bff"}}>{item.name}</td>
                  <td>{item.company.name}</td>
                  <Link to={`/posts/${item.id}`} style={{cursor:"pointer"}}><td><Button className='btn btn-sm'>See Posts</Button></td></Link>
                </tr>
              ))}
          </Table>
        </div>
    </Fragment>
  )
}

export default App;