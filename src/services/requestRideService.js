import { SERVER } from '../global'

export function requestRide (req) {
	return fetch( SERVER + '/requests',{
		method: 'POST',
		body: JSON.stringify(req),
		headers:{
			'Content-Type': 'application/json',
			Authorization: "Basic " + btoa(req.email + ":" + req.password)
		}
	})
}

export function getWaitingList (req) {
	return fetch( SERVER + '/recommend',{
		method: 'POST',
		body: JSON.stringify(req),
		headers:{
			'Content-Type': 'application/json',
			Authorization: "Basic " + btoa(req.email + ":" + req.password)
		}
	})
}
  