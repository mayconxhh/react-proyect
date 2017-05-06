import React, { Component } from 'react'
import Post from '../../posts/containers/Post.jsx'
import api from '../../api.js'

class Profile extends Component {

	constructor(props){
		super(props)

		this.state = {
			email: '',
			user:{},
			posts: [],
			loading: true,
		}
	}

	async componentDidMount() {
		const [
			user,
			posts,
		] = await Promise.all([
			api.users.getSingle(this.props.match.params.id),
			api.users.getPosts(this.props.match.params.id),
		])

		this.setState({
			user,
			posts,
			loading: false,
			email: user.email,
		})
	}

	render() {
		return (
			<section className="Profile">
				<h2>Perfil de {this.state.user.name}</h2>
				<fieldset>
					<legend>Información básica</legend>
					<input type="email" value={this.state.email} disabled />
				</fieldset>
				{this.state.user.address && (
					<fieldset>
						<legend>Address</legend>
						<address>
							{this.state.user.address.street}<br />
							{this.state.user.address.suite}<br />
							{this.state.user.address.city}<br />
							{this.state.user.address.zipcode}<br />
						</address>
					</fieldset>
				)}
				<section>
					{this.state.posts
						.map(post => <Post key={post.id} {...post} user={this.state.user}/>)
					}
				</section>
			</section>
		)
	}
}

export default Profile