<script lang="ts">
	import { enhance } from '$app/forms'

	export let form

	$: submissionStatus = form?.body?.message
</script>

<h2>Action</h2>

{#if submissionStatus === 'submitting'}
	<p>Submitting...</p>
{:else if submissionStatus === 'failed'}
	<p>Submission failed.</p>
{:else if submissionStatus === 'success'}
	<p>Submission success.</p>

	<button
		data-sveltekit-reload
		on:click={() => {
			submissionStatus = null
		}}
	>
		Submit another?
	</button>
{:else}
	<form method="POST" use:enhance>
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
		<input type="submit" value="Submit to Airtable" />
	</form>
{/if}

<p><a href="/">Back</a></p>
