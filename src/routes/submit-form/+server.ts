import {
	AIRTABLE_API_KEY,
	AIRTABLE_BASE_ID,
} from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request }) => {
	const form_data = await request.formData()

	const name = form_data.get('name')
	const email = form_data.get('email')
	const message = form_data.get('message')

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
