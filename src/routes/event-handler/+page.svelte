<script lang="ts">
	let submission_status = ''
	const handle_submit = async (event: Event) => {
		submission_status = 'submitting'

		const form = event.target as HTMLFormElement
		const form_data = new FormData(form)
		const data = Object.fromEntries(form_data)

		const res = await fetch('/submit-form', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		const { message } = await res.json()
		submission_status = message
	}
</script>

<h2>Event handler</h2>

{#if submission_status === 'submitting'}
	<p>Submitting...</p>
{:else if submission_status === 'failed'}
	<p>Submission failed.</p>
{:else if submission_status === 'success'}
	<p>Submission success.</p>

	<button
		on:click={() => {
			submission_status = ''
		}}
	>
		Submit another?
	</button>
{:else}
	<form method="POST" on:submit|preventDefault={handle_submit}>
		<label for="name">
			<span>Name</span>
		</label>
		<input
			type="text"
			name="name"
			aria-label="name"
			placeholder="Enter your name"
			required
			autocomplete="off"
		/>
		<label for="email">
			<span>Email</span>
		</label>
		<input
			type="email"
			name="email"
			aria-label="email"
			placeholder="bill@hotmail.com"
			required
			autocomplete="off"
		/>
		<label for="message">
			<span>Message</span>
		</label>
		<textarea
			name="message"
			aria-label="message"
			placeholder="Message"
			required
			rows="3"
			autocomplete="off"
		/>
		<input type="submit" value="Submit to Airtable" />
	</form>
{/if}

<p><a href="/">Back</a></p>
