import React from 'react'

function RoutesList({ match: { url, params } }) {
	console.log(`URL: ${url} - Params: ${params.accion}`);
	
	return (
		<div>
			Routes {params.accion}
		</div>
	)
}

export default RoutesList
