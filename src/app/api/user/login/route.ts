import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
   const requestBody = await request.json();

   const res = await fetch(`${process.env.API_URL}/user/login`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
   });

   const data = await res.json();

   return NextResponse.json(
      { token: data, status: res.status },
      { status: res.status },
   );
}
