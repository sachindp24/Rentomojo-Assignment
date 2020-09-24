import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Posts from './Posts';
import Post from './Post';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={App}/>
        <Route path="/posts/:userId" exact component={Posts}/>
        <Route path="/post/:postId" exact component={Post}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
