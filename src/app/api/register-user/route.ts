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

   const data = await res;

   if (data.status === 409) {
      const message = await data.json();
      if (message.startsWith("Email"))
         return NextResponse.json(data, {
            statusText: "email",
            status: res.status,
         });
      return NextResponse.json(data, {
         statusText: "username",
         status: res.status,
      });
   }

   return NextResponse.json(data, { status: res.status });
}
