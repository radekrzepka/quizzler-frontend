import { NextResponse } from "next/server";

export async function POST(request: Request) {
   const requestBody = await request.json();

   const res = await fetch(`${process.env.API_URL}/User/registerUser`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
   });

   const message = await res.json();

   console.log(message);

   return NextResponse.json(message, {
      statusText: message,
      status: res.status,
   });
}
