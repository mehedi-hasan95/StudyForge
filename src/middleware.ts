import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);

import {
  publicRoutes,
  apiUploadthingPrefix,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

//@ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const isLogIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiUploadthingRoute =
    nextUrl.pathname.startsWith(apiUploadthingPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  //   User allow to login or register API access
  if (isApiAuthRoute) {
    return null;
  }

  //   User allow to login or register API access
  if (isApiUploadthingRoute) {
    return null;
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
