import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home.jsx'
import Post from './Post.jsx'
import Profile from './Profile.jsx'
import Error404 from './Error404.jsx'

function Pages() {
	return (
		<div>
			<Switch>
				{/*Articles List*/}
				<Route exact path="/" component={ Home }/>
				{/*Detail Post*/}
				<Route exact path="/post/:id" component={ Post }/>
				{/*Detail User*/}
				<Route exact path="/user/:id" component={ Profile }/>
				{/*Error 404*/}
				<Route component={ Error404 }/>
			</Switch>
		</div>
	)
}

export default Pages