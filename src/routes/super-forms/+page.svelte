<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client'
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'
	import { z } from 'zod'
	export let data

	const new_contact = z.object({
		name: z.string().min(2),
		email: z.string().email(),
		message: z.string().min(10),
	})

	const { form, errors, enhance } = superForm(data.form, {
		validators: new_contact,
		resetForm: true,
	})
</script>

<div class="mx-auto max-w-xl">
	<h2>Super form</h2>

	<form method="POST" use:enhance>
		<label for="name" class="label">
			<span class="label-text">Name</span>
		</label>
		<input
			bind:value={$form.name}
			type="text"
			name="name"
			aria-label="name"
			placeholder="Enter your name"
			required
			autocomplete="off"
			class="input input-bordered w-full"
		/>
		<label for="name" class="label">
			<span
				class="label-text-alt {$errors.name
					? 'text-error'
					: 'text-base-100'}"
			>
				{$errors.name}
			</span>
		</label>

		<label for="email" class="label">
			<span class="label-text">Email</span>
		</label>
		<input
			bind:value={$form.email}
			type="email"
			name="email"
			aria-label="email"
			placeholder="bill@hotmail.com"
			required
			autocomplete="off"
			class="input input-bordered w-full"
		/>
		<label for="email" class="label">
			<span
				class="label-text-alt {$errors.email
					? 'text-error'
					: 'text-base-100'}"
			>
				{$errors.email}
			</span>
		</label>

		<label for="message" class="label">
			<span class="label-text">Message</span>
		</label>
		<textarea
			bind:value={$form.message}
			name="message"
			aria-label="message"
			placeholder="Message"
			required
			rows="3"
			autocomplete="off"
			class="textarea input-bordered w-full"
		/>
		<label for="message" class="label">
			<span
				class="label-text-alt {$errors.message
					? 'text-error'
					: 'text-base-100'}"
			>
				{$errors.message}
			</span>
		</label>

		<input
			type="submit"
			value="Submit to Airtable"
			class="btn btn-primary w-full mt-10"
		/>
	</form>

	<p>
		<a
			href="/"
			data-sveltekit-reload
			class="btn btn-secondary w-full !text-secondary-content"
		>
			Back
		</a>
	</p>

	<h3>Superforms SuperDebug component</h3>

	<SuperDebug data={$form} />
</div>
