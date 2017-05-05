import React from 'react'
import { Switch, Route } from 'react-router'

import {Home} from './Home.jsx'
import {About} from './About.jsx'
import {Error404} from './Error404.jsx'

const Pages = () => (
	<main role="application">
		<ul>
			<li>Hola Mundo!</li>
		</ul>
		<Switch>
			<Route exact path="/" component={ Home }/>
			<Route exact path="/about" component={ About }/>
			<Route component={ Error404 }/>
		</Switch>
	</main>
)

export default Pages