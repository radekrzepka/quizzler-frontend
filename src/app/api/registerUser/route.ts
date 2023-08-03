import { NextResponse } from "next/server";

export async function POST(request: Request) {
   const requestBody = await request.json();

   console.log(requestBody);

   const res = await fetch(`${process.env.API_URL}/User/registerUser`, {
      headers: {
         "Content-Type": "application/json",
      },
      method: "POST",
      body: requestBody,
   });

   const data = await res.json();

   return NextResponse.json(data);
}
