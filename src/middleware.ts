import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
   const JWT = request.cookies.get("JWT")?.value;

   if (!JWT) {
      if (request.nextUrl.pathname.includes("/dashboard")) {
         return NextResponse.redirect("/");
      }
      return;
   }

   const res = await fetch(`${process.env.URL}/api/user/check`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: JWT,
      },
      method: "GET",
   });

   const jwtStatus = res.status;

   if (jwtStatus === 200 && !request.nextUrl.pathname.includes("/dashboard")) {
      return NextResponse.redirect("/dashboard");
   }

   if (jwtStatus === 401 && request.nextUrl.pathname.includes("/dashboard")) {
      return NextResponse.redirect("/");
   }
}

export const config = {
   matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};
