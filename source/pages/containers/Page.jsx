import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home.jsx'
import About from './About.jsx'
import Error404 from './Error404.jsx'

function Pages() {
	return (
		<div>
			<Switch>
				<Route exact path="/" component={ Home }/>
				<Route exact path="/about" component={ About }/>
				<Route component={ Error404 }/>
			</Switch>
		</div>
	)
}

export default Pages