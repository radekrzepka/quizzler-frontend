import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DASHBOARD, LOGIN, RESTRICTED_PATHS } from "./utils/urls";

const isUserLogIn = async (request: NextRequest) => {
   const JWT = request.cookies.get("JWT")?.value;
   if (!JWT) return false;
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/check`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: JWT,
      },
      method: "GET",
   });
   const jwtStatus = res.status;
   return jwtStatus === 200;
};

export async function middleware(request: NextRequest) {
   const userLogIn = await isUserLogIn(request);
   const requestPath = request.nextUrl.pathname;

   if (!userLogIn && RESTRICTED_PATHS.includes(requestPath)) {
      return NextResponse.redirect(
         `${process.env.URL}${LOGIN}?next=${requestPath}`
      );
   }

   if (userLogIn && (requestPath === "/" || requestPath.includes("/auth"))) {
      return NextResponse.redirect(`${process.env.URL}${DASHBOARD}`);
   }
}
