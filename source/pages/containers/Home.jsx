import React, { Component } from 'react'
import { Link } from 'react-router'

class Home extends Component {
	render() {
		return (
			<div class="Home">
				<h1>Home</h1>
				<Link to="/about">
					Go to about
				</Link>
			</div>
		)
	}
}

export default Home