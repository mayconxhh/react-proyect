import fetch from 'isomorphic-fetch'

const base_url = 'https://jsonplaceholder.typicode.com/'

const api = {
	posts: {
		async getList(page = 1) {
			const res = await fetch(`${base_url}posts?_page=${page}`)
			const data = await res.json()
			return data
		},
		async getSingle(id = 1) {
			const res = await fetch(`${base_url}posts/${id}`)
			const data = await res.json()
			return  data
		},
		async getComments(id = 1) {
			const res = await fetch(`${base_url}posts/${id}/comments`)
			const data = await res.json()
			return  data
		},
	},
	users: {
		async getSingle(id = 1) {
			const res = await fetch(`${base_url}users/${id}`)
			const data = await res.json()
			return  data
		},
		async getPosts(id = 1) {
			const res = await fetch(`${base_url}posts/?userId=${id}`)
			const data = await res.json()
			return  data
		},
	}
}

export default api