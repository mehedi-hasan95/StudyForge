/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/verification", "/new-password", "/courses"];

/**
 * An array of routes that are used for authentication
 * This is the signin or register page
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = ["/signin", "/register", "/forgot-password"];
export const courseRoute = ["/course"];

/**
 * The prefix for API authentication routes
 * This is the authjs route
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";
export const apiUploadthingPrefix = "/api/uploadthing";
export const apiStripegPrefix = "/api/webhook";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
