<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();
	let submission_status = $state(null);
	const form_message = $derived(form?.body?.message);
	$effect(() => {
		submission_status = form_message;
	});
</script>

<div class="mx-auto max-w-xl">
	<h2>Action</h2>

	{#if submission_status === 'submitting'}
		<p>Submitting...</p>
	{:else if submission_status === 'failed'}
		<p>Submission failed.</p>
	{:else if submission_status === 'success'}
		<p>Submission success.</p>

		<button
			data-sveltekit-reload
			onclick={() => {
				submission_status = null;
			}}
			class="btn btn-primary w-full"
		>
			Submit another?
		</button>
	{:else}
		<form method="POST" use:enhance>
			<label for="name" class="label">
				<span class="label-text">Name</span>
			</label>
			<input
				type="text"
				name="name"
				aria-label="name"
				placeholder="Enter your name"
				required
				autocomplete="off"
				class="input input-bordered w-full"
			/>
			<label for="email" class="label">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				name="email"
				aria-label="email"
				placeholder="bill@hotmail.com"
				required
				autocomplete="off"
				class="input input-bordered w-full"
			/>
			<label for="message" class="label">
				<span class="label-text">Message</span>
			</label>
			<textarea
				name="message"
				aria-label="message"
				placeholder="Message"
				required
				rows="3"
				autocomplete="off"
				class="textarea input-bordered mb-10 w-full"
			></textarea>
			<input
				type="submit"
				value="Submit to Airtable"
				class="btn btn-primary w-full"
			/>
		</form>
	{/if}

	<p>
		<a
			href="/"
			data-sveltekit-reload
			class="btn btn-secondary !text-secondary-content w-full"
		>
			Back
		</a>
	</p>
</div>
