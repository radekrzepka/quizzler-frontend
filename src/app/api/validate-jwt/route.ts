import { NextResponse } from "next/server";

export async function GET(request: Request) {
   const JWT = request.headers.get("authorization");

   const res = await fetch(`${process.env.API_URL}/User/validateJWT`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: JWT as string,
      },
      method: "GET",
   });

   const data = await res;

   console.log(data.status);

   return NextResponse.json(data, { status: res.status });
}
