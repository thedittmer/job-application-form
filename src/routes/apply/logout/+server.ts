import { redirect } from "@sveltejs/kit";

export const POST = async ({ locals }) => {
  locals.pb.authStore.clear();
  locals.user = null;
  throw redirect(303, "/apply");
};
