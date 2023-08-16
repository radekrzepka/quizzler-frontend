import { NextResponse, type NextRequest } from "next/server";
import { cookies, headers } from "next/headers";

export async function GET(request: NextRequest) {
   const headersList = headers();
   const authorization = headersList.get("authorization");

   const res = await fetch(`${process.env.API_URL}/user/profile`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: authorization as string,
      },
      method: "GET",
   });

   const data = await res.json();

   return NextResponse.json(data, { status: res.status });
}
