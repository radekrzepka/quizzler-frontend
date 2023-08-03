import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
   const requestBody = await request.json();

   const res = await fetch(`${process.env.API_URL}/User/loginUser`, {
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
   });

   const data = await res.json();

   if (res.status === 200) {
      cookies().set("JWT", data);
   }

   return NextResponse.json(data, { status: res.status });
}
