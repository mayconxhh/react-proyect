import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
	render() {
		return (
			<div class="Home">
				<h1>Home</h1>
				<ul>
					<li>
						<Link to="/about">
							Go to about
						</Link>
					</li>
				</ul>
			</div>
		)
	}
}

export default Home