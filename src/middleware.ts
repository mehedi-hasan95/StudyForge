import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);

import {
  publicRoutes,
  apiUploadthingPrefix,
  authRoutes,
  apiAuthPrefix,
  apiStripegPrefix,
  courseRoute,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
import { CurrentUserRole } from "./lib/current-user";

//@ts-ignore
export default auth(async (req) => {
  const userRole = await CurrentUserRole();
  const { nextUrl } = req;
  const isLogIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiStripeRoute = nextUrl.pathname.startsWith(apiStripegPrefix);
  const isApiUploadthingRoute =
    nextUrl.pathname.startsWith(apiUploadthingPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isCourseRoute = courseRoute.includes(nextUrl.pathname);

  // access controll for teacher
  const isTeacherRoute = nextUrl.pathname.startsWith("/teacher");
  const isAnalyticsRoute = nextUrl.pathname.startsWith("/analytics");
  if (isTeacherRoute || isAnalyticsRoute) {
    if (userRole !== "TEACHER") {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  // access controll for admin
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isCategoryRoute = nextUrl.pathname.startsWith("/category");
  if (isAdminRoute || isCategoryRoute) {
    if (userRole !== "ADMIN") {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  //   User allow to login or register API access
  if (isApiAuthRoute) {
    return null;
  }
  //   User allow Stripe API access
  if (isApiStripeRoute) {
    return null;
  }

  //   User allow to login or register API access
  if (isApiUploadthingRoute) {
    return null;
  }
  //   Course Redirect
  if (isCourseRoute) {
    return Response.redirect(new URL("/courses", nextUrl));
  }

  //   User allow to login or register page. If login redirect to default page
  if (isAuthRoute) {
    if (isLogIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  //   Logout user can't visit the spesific page
  if (!isLogIn && !isPublicRoute) {
    // User trying to visite procected route redirect to login after logit redirect the previous page
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    // The route
    return Response.redirect(
      new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
