import React from 'react'

function Layout(props) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8"/>
				<title>{props.title}</title>
			</head>
			<body>
				<div 
					id="render-target" 
					dangerouslySetInnerHTML={{
						__html: props.content
					}}>
				</div>
				<script src="http://localhost:5001/app.js"></script>
			</body>
		</html>
	)
}

export default Layout