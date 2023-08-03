import { NextResponse } from "next/server";

export async function POST(request: Request) {
   const requestBody = await request.json();

   console.log(requestBody);

   const res = await fetch(`${process.env.API_URL}/User/registerUser`, {
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
      method: 'POST',
      body: JSON.stringify(requestBody),
   });

   const data = await res.json();

   return NextResponse.json(data);
}
