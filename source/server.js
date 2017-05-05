import http from 'http'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import Pages from './pages/containers/Page.jsx'

console.log(1)

function requestHandler(req, res) {

	console.log(2)

	const context = {}

	console.log(context)
	console.log(Pages)

	let html = renderToString(
		<StaticRouter location={req.url} context={context}>
			<Pages/>
		</StaticRouter>
	)

	console.log(html)

	console.log(3)

	console.log(context.redirect)
	console.log(context.missed)
	console.log(context.url)

	res.setHeader('Content-Type', 'text/html')

	if(context.redirect){
		res.writeHead(301, {
			Location: context.redirect.pathname,
		})
		res.end()
		console.log(3.1)
	}
	console.log(4)
	if(context.missed){
		console.log(4.1)
		res.writeHead(404)

		html = renderToString(
			<StaticRouter location={req.url} context={context}>
				<Pages/>
			</StaticRouter>
		)
	}

	console.log(5)

	res.write(`<!doctype html>
      			<div id="app">${html}</div>`)
	res.end()

	console.log(6)
}

const server = http.createServer(requestHandler)

server.listen(5000, function(err){
	if(err){
		console.log('Ocurrió un error al iniciar el servidor.')
		return
	}

	console.log('Corriendo servidor en el puerto: 5000')
})