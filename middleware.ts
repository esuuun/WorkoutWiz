import { auth, authMiddleware, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// export default clerkMiddleware();

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect()
    
  } 
});


const isProtectedRoute = createRouteMatcher(["/dashboard(.*)","/form(.*)"]);
const isPublicRoute = createRouteMatcher(["/","/api/webhook"]);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
