import React, { Component } from 'react'
import { Link } from 'react-router'

class About extends Component {
	render() {
		return (
			<section class="About">
				<h1>Home</h1>
				<Link to="/">
					Go to home
				</Link>
				<Link to="/random">
					Go to about
				</Link>
			</section>
		)
	}
}

export default About