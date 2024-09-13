<script lang="ts">
  import CreateAccount from './CreateAccount.svelte';
  import Login from './Login.svelte';
  import JobApplication from './JobApplication.svelte';

  export let data;
  let currentStep = data.user ? 2 : 1;

  function logout() {
    fetch('/apply/logout', { method: 'POST' })
      .then(() => {
        currentStep = 1;
        data.user = null;
      });
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6">Job Application</h1>

  {#if currentStep === 1}
    <Login {data} bind:currentStep />
    <CreateAccount {data} bind:currentStep />
  {:else if currentStep === 2}
    <JobApplication {data} />
    <button on:click={logout} class="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Logout
    </button>
  {/if}
</div>