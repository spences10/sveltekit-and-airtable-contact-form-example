<script lang="ts">
	let submissionStatus = ''
	const handleSubmit = async (data: {
		currentTarget: HTMLFormElement | undefined
	}) => {
		submissionStatus = 'submitting'
		const formData = new FormData(data.currentTarget)

		const res = await fetch('/submit-form', {
			method: 'POST',
			body: formData,
		})

		const { message } = await res.json()
		submissionStatus = message
	}
</script>

{#if submissionStatus === 'submitting'}
	<p>Submitting...</p>
{:else if submissionStatus === 'failed'}
	<p>Submission failed.</p>
{:else if submissionStatus === 'success'}
	<p>Submission success.</p>
{:else}
	<form method="POST" on:submit|preventDefault={handleSubmit}>
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
			aria-label="name"
			placeholder="Message"
			required
			rows="3"
			autocomplete="off"
		/>
		<input type="submit" />
	</form>
{/if}

<style>
	form {
		font-family: sans-serif;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}
	form label {
		display: block;
		margin-bottom: 1rem;
	}
	form input,
	form textarea {
		display: block;
		margin-bottom: 1rem;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 3px;
	}
	form input[type='submit'] {
		background: #663399;
		color: #fff;
		padding: 0.5rem;
		border: none;
		border-radius: 3px;
		cursor: pointer;
	}
</style>
