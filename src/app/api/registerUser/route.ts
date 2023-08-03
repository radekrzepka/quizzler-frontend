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
         return NextResponse.json("email", {
            status: res.status,
            statusText: "email",
         });
      return NextResponse.json("username", {
         status: res.status,
         statusText: "username",
      });
   }

   return NextResponse.json(data, { status: res.status });
}
