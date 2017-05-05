import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Error extends Component {
	render() {
		return (
			<div class="Error">
				<h1>Home</h1>
				<ul>
					<li>
						<Link to="/">
							Go to home
						</Link>
					</li>
				</ul>
			</div>
		)
	}
}

export default Error