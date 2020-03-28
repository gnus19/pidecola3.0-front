export function requestRide (req) {
	return fetch( '/requests',{
		method: 'POST',
		body: JSON.stringify(req),
		headers:{
			'Content-Type': 'application/json'
		}
	})
}

export function getWaitingList (req) {
	return fetch( '/recommend',{
		method: 'POST',
		body: JSON.stringify(req),
		headers:{
			'Content-Type': 'application/json'
		}
	})
}
  