import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Post extends Component {
	render() {
		return (
			<div className="Post">
				<h1>Post</h1>
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

export default Post