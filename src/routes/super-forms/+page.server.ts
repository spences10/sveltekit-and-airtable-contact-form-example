import { AIRTABLE_BASE_ID, AIRTABLE_API_KEY } from '$env/static/private'
import { fail } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { z } from 'zod'

const new_contact = z.object({
	name: z.string(),
	email: z.string().email(),
	message: z.string(),
})

export const load = async (event) => {
	const form = await superValidate(event, new_contact)
	return {
		form,
	}
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, new_contact)
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
