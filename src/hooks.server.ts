import type { Handle } from "@sveltejs/kit";
import PocketBase from "pocketbase";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase("http://127.0.0.1:8090");
  event.locals.pb.authStore.loadFromCookie(
    event.request.headers.get("cookie") || ""
  );

  try {
    if (event.locals.pb.authStore.isValid) {
      event.locals.user = structuredClone(event.locals.pb.authStore.model);
    } else {
      event.locals.user = null;
    }
  } catch (err) {
    event.locals.pb.authStore.clear();
    event.locals.user = null;
  }

  const response = await resolve(event);
  response.headers.set(
    "set-cookie",
    event.locals.pb.authStore.exportToCookie({ httpOnly: false })
  );

  return response;
};
