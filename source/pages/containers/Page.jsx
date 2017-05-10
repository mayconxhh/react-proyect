/* eslint linebreak-style: ["error", "windows"]*/
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Post from './Post';
import Profile from './Profile';
import Error404 from './Error404';
import Header from '../../shared/components/Header';

function Pages() {
  return (
    <div>
      <Header />
      <Switch>
        {/* Articles List*/}
        <Route exact path="/" component={Home} />
        {/* Detail Post*/}
        <Route exact path="/post/:id" component={Post} />
        {/* Detail User*/}
        <Route exact path="/user/:id" component={Profile} />
        {/* Error 404*/}
        <Route component={Error404} />
      </Switch>
    </div>
  );
}

export default Pages;
