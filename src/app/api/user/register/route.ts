import { NextResponse } from "next/server";

export async function POST(request: Request) {
   const requestBody = await request.json();
   const res = await fetch(`${process.env.API_URL}/user/register`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
      cache: "no-store",
   });

   const data = await res.json();

   return NextResponse.json(
      { message: data },
      {
         status: res.status,
      },
   );
}
