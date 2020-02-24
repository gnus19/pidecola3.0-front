export function requestRide (req) {
	return fetch( '/requests',{
		method: 'POST',
		body: JSON.stringify(req),
		headers:{
			'Content-Type': 'application/json'
		}
	})
}
  