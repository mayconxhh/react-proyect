import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class About extends Component {
	render() {
		return (
			<div class="About">
				<h1>Home</h1>
				<ul>
					<li>
						<Link to="/">
							Go to home
						</Link>
					</li>
					<li>
						<Link to="/random">
							Go to err
						</Link>
					</li>
				</ul>
			</div>
		)
	}
}

export default About