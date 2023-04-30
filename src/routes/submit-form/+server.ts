import {
	AIRTABLE_API_KEY,
	AIRTABLE_BASE_ID,
} from '$env/static/private'
import { json } from '@sveltejs/kit'

export const POST = async ({ request }) => {
	const { name, email, message } = await request.json()

	const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/submissions`

	let data = {
		records: [
			{
				fields: {
					name,
					email,
					message,
				},
			},
		],
	}
	const res = await fetch(AIRTABLE_URL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${AIRTABLE_API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	if (res.ok) {
		return json({
			message: 'success',
		})
	} else {
		return json({
			message: 'failed',
			status: 404,
		})
	}
}
