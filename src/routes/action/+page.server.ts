export const actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData()
		const data = Object.fromEntries(formData)
		const res = await fetch('/submit-form', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		const responseJson = await res.json()
		return {
			body: responseJson,
		}
	},
}
