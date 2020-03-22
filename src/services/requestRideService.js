import { SERVER } from '../global'

export function requestRide (req) {
	return fetch( SERVER + '/requests',{
		method: 'POST',
		body: JSON.stringify(req),
		headers:{
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('tkauth')
		}
	})
}

export function getWaitingList (req) {
	return fetch( SERVER + '/recommend',{
		method: 'POST',
		body: JSON.stringify(req),
		headers:{
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('tkauth')
		}
	})
}
  