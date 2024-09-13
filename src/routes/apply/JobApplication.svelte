<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  export let data;

  const { form, errors, enhance } = superForm(data.jobApplicationForm, {
    onResult: ({ result }) => {
      if (result.type === 'success') {
        alert('Application submitted successfully!');
      } else {
        console.error('Submission failed:', result);
      }
    },
  });
</script>

<form method="POST" use:enhance action="?/submitApplication" enctype="multipart/form-data" class="space-y-4">
  <h2 class="text-2xl font-bold">Job Application</h2>
  <div>
    <label for="job_title" class="block text-sm font-medium text-gray-700">Job Title</label>
    <input type="text" id="job_title" bind:value={$form.job_title} name="job_title" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    {#if $errors.job_title}<span class="text-red-500 text-sm">{$errors.job_title}</span>{/if}
  </div>
  
  <div>
    <label for="resume" class="block text-sm font-medium text-gray-700">Resume</label>
    <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" class="mt-1 block w-full" />
  </div>
  
  <div>
    <label for="cover_letter" class="block text-sm font-medium text-gray-700">Cover Letter</label>
    <textarea id="cover_letter" bind:value={$form.cover_letter} name="cover_letter" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
    {#if $errors.cover_letter}<span class="text-red-500 text-sm">{$errors.cover_letter}</span>{/if}
  </div>
  
  <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
    Submit Application
  </button>
</form>