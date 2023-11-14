import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DASHBOARD } from "./utils/urls";

export async function middleware(request: NextRequest) {
   const JWT = request.cookies.get("JWT")?.value;

   if (!JWT) {
      if (request.nextUrl.pathname.includes(DASHBOARD)) {
         return NextResponse.redirect(process.env.URL + "/");
      }
      return;
   }

   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/check`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: JWT,
      },
      method: "GET",
   });

   const jwtStatus = res.status;

   if (jwtStatus === 200 && !request.nextUrl.pathname.includes(DASHBOARD)) {
      return NextResponse.redirect(process.env.URL + DASHBOARD);
   }

   if (jwtStatus === 401 && request.nextUrl.pathname.includes(DASHBOARD)) {
      return NextResponse.redirect(process.env.URL + "/");
   }
}

export const config = {
   matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};
