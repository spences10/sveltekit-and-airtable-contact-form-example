import { AIRTABLE_BASE_ID, AIRTABLE_API_KEY } from '$env/static/private'
import { fail } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { zod } from 'sveltekit-superforms/adapters'
import { z } from 'zod'

const schema = zod(z.object({
	name: z.string().min(2),
	email: z.string().email(),
	message: z.string().min(10),
}));

export const load = async (event) => {
	const form = await superValidate(event, schema)
	return {
		form,
	}
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, schema)
		if (!form.valid) fail(400, { form })
		
		const { name, email, message } = form.data

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
		await fetch(AIRTABLE_URL, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${AIRTABLE_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		return {
			form,
		}
	},
}
