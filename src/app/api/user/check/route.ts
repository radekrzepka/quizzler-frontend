import { NextResponse } from "next/server";

export async function GET(request: Request) {
   const JWT = request.headers.get("authorization");

   const res = await fetch(`${process.env.API_URL}/user/check`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: JWT as string,
      },
      method: "GET",
      cache: "no-cache",
   });

   return NextResponse.json(res, { status: res.status });
}
