import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
   const JWT = request.cookies.get("JWT")?.value;

   const res = await fetch(`${process.env.URL}/api/user/check`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${JWT}`,
      },
      method: "GET",
      cache: "no-cache",
   });

   const jwtStatus = res.status;

   if (jwtStatus === 401 && request.nextUrl.pathname.includes("/dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
   }
}

export const config = {
   matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};
