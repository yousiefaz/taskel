import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

// import { NextResponse } from "next/server";
// import createMiddleware from "next-intl/middleware";

// import { auth } from "@/auth";
// import { routing } from "@/i18n/routing";

// const intlMiddleware = createMiddleware(routing);

// export default auth((req) => {
//   const pathname = req.nextUrl.pathname;

//   const locale = pathname.split("/")[1];

//   const isAuthenticated = !!req.auth;

//   const isAuthPage =
//     pathname.includes(`/${locale}/sign-in`) ||
//     pathname.includes(`/${locale}/sign-up`);

//   const isProtectedPage = pathname.includes(`/${locale}/tasks`);

//   if (isAuthPage && isAuthenticated) {
//     return NextResponse.redirect(new URL(`/${locale}/tasks`, req.nextUrl));
//   }

//   if (isProtectedPage && !isAuthenticated) {
//     return NextResponse.redirect(new URL(`/${locale}/sign-in`, req.nextUrl));
//   }

//   return intlMiddleware(req);
// });

// export const config = {
//   matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
// };
