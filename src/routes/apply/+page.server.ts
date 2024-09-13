import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import PocketBase from "pocketbase";
import { userSchema, jobApplicationSchema, loginSchema } from "$lib/schemas";

const pb = new PocketBase("http://127.0.0.1:8090");

export const load = async ({ locals }) => {
  const userForm = await superValidate(zod(userSchema));
  const jobApplicationForm = await superValidate(zod(jobApplicationSchema));
  const loginForm = await superValidate(zod(loginSchema));
  return { userForm, jobApplicationForm, loginForm, user: locals.user };
};

export const actions = {
  login: async ({ request, locals }) => {
    const form = await superValidate(request, zod(loginSchema));
    if (!form.valid) return fail(400, { form });

    try {
      await pb
        .collection("users")
        .authWithPassword(form.data.email, form.data.password);
      locals.user = pb.authStore.model;
      return { form };
    } catch (error) {
      console.error("Error logging in:", error);
      return fail(401, { form, error: "Invalid email or password" });
    }
  },

  submitApplication: async ({ request, locals }) => {
    console.log("User session:", locals.user);

    if (!locals.user) {
      console.error("User not logged in");
      return fail(401, {
        form: await superValidate(request, zod(jobApplicationSchema)),
        error: "You must be logged in to submit an application",
      });
    }

    const form = await superValidate(request, zod(jobApplicationSchema));
    if (!form.valid) {
      console.error("Form validation failed:", form.errors);
      return fail(400, { form });
    }

    try {
      const formData = new FormData();
      formData.append("job_title", form.data.job_title);
      if (form.data.resume) formData.append("resume", form.data.resume);
      formData.append("cover_letter", form.data.cover_letter);
      formData.append("user", locals.user.id);

      console.log("Submitting application:", formData);

      await pb.collection("job_applications").create(formData);
      console.log("Application submitted successfully");
      return { form };
    } catch (error) {
      console.error("Error submitting application:", error);
      return fail(500, { form, error: "Failed to submit application" });
    }
  },

  logout: async ({ locals }) => {
    pb.authStore.clear();
    locals.user = null;
    throw redirect(303, "/apply");
  },
};
