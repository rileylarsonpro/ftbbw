import { auth } from './utils/auth';
import { defineMiddleware } from 'astro:middleware';

const authPaths = ['/ftbbw/create', '/user/settings'];

const dynamicAuthPaths = [/^\/ftbbw\/answer\/\d+$/];

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.isPrerendered) {
    return next();
  }
  const isAuthed = await auth.api.getSession({
    headers: context.request.headers
  });

  if (isAuthed) {
    context.locals.user = isAuthed.user;
    context.locals.session = isAuthed.session;
    context.locals.isAdmin = isAuthed.user.email === process.env.ADMIN_EMAIL;
  } else {
    context.locals.user = null;
    context.locals.session = null;
    context.locals.isAdmin = false;

    const url = new URL(context.request.url);
    const isProtectedPath =
      authPaths.includes(url.pathname) ||
      dynamicAuthPaths.some((pattern) => pattern.test(url.pathname));

    if (isProtectedPath) {
      return next(`/login?redirectURL=${url.pathname}`);
    }
  }

  return next();
});
