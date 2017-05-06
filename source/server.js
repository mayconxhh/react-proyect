import http from 'http'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import Pages from './pages/containers/Page.jsx'
import Layout from './pages/components/Layout.jsx'

function requestHandler(req, res) {

	const context = {}

	let html = renderToString(
		<StaticRouter location={req.url} context={context}>
			<Pages/>
		</StaticRouter>
	)

	res.setHeader('Content-Type', 'text/html')

	if(context.redirect){
		res.writeHead(301, {
			Location: context.redirect.pathname,
		})
		res.end()

	}

	if(context.missed){

		res.writeHead(404)

		html = renderToString(
			<StaticRouter location={req.url} context={context}>
				<Pages/>
			</StaticRouter>
		)
	}

	res.write(
		renderToStaticMarkup(
			<Layout 
				title="Aplicación" 
				content={html} 
			/>
		)
	)
	res.end()
}

const server = http.createServer(requestHandler)

server.listen(5000, function(err){
	if(err){
		console.log('Ocurrió un error al iniciar el servidor.')
		return
	}

	console.log('Corriendo servidor en el puerto: 5000')
})