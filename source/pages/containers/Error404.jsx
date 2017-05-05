import React, { Component } from 'react'
import { Link } from 'react-router'

class Error extends Component {
	render() {
		return (
			<section class="Error">
				<h1>Home</h1>
				<Link to="/">
					Go to home
				</Link>
			</section>
		)
	}
}

export default Error