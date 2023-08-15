import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
   const JWT = request.cookies.get("JWT")?.value;

   const res = await fetch(`${process.env.URL}/api/user/check`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${JWT}`,
      },
      method: "GET",
   });

   const jwtStatus = res.status;

   if (jwtStatus === 200 && !request.nextUrl.pathname.includes("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
   }

   if (jwtStatus === 401 && request.nextUrl.pathname.includes("/dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
   }
}

export const config = {
   matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};
