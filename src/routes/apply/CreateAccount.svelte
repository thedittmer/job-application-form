<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  export let data;
  export let currentStep;

  const { form, errors, enhance } = superForm(data.userForm, {
    onResult: ({ result }) => {
      if (result.type === 'success') {
        currentStep = 2;
      }
    },
  });
</script>

<form method="POST" use:enhance action="?/createUser" class="space-y-4">
  <h2 class="text-2xl font-bold mb-4">Create Account</h2>
  <div>
    <label for="create-email" class="block text-sm font-medium text-gray-700">Email</label>
    <input type="email" id="create-email" bind:value={$form.email} name="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    {#if $errors.email}<span class="text-red-500 text-sm">{$errors.email}</span>{/if}
  </div>
  
  <div>
    <label for="create-password" class="block text-sm font-medium text-gray-700">Password</label>
    <input type="password" id="create-password" bind:value={$form.password} name="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    {#if $errors.password}<span class="text-red-500 text-sm">{$errors.password}</span>{/if}
  </div>

  <div>
    <label for="create-passwordConfirm" class="block text-sm font-medium text-gray-700">Confirm Password</label>
    <input type="password" id="create-passwordConfirm" bind:value={$form.passwordConfirm} name="passwordConfirm" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    {#if $errors.passwordConfirm}<span class="text-red-500 text-sm">{$errors.passwordConfirm}</span>{/if}
  </div>
  
  <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
    Create Account & Continue
  </button>
</form>