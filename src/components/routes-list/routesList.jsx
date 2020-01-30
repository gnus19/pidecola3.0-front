import React from 'react'

function routesList({ match: { url } }) {
	console.log(url);
	
	return (
		<div>
			Routes
		</div>
	)
}

export default routesList
